// Hook for managing video progress with backend sync
import { useState, useEffect, useCallback, useRef } from 'react';
import { updateVideoProgress, getVideoProgress } from '@/services/videoService';
import { ApiVideoProgress } from '@/types/api';

interface UseVideoProgressOptions {
  videoId: string;
  studentId: string;
  onComplete?: () => void;
  syncInterval?: number; // milliseconds
}

interface VideoProgressState {
  watchedSeconds: number;
  lastPositionSeconds: number;
  progressPercentage: number;
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useVideoProgress({
  videoId,
  studentId,
  onComplete,
  syncInterval = 15000, // Sync every 15 seconds
}: UseVideoProgressOptions) {
  const [state, setState] = useState<VideoProgressState>({
    watchedSeconds: 0,
    lastPositionSeconds: 0,
    progressPercentage: 0,
    isCompleted: false,
    isLoading: true,
    error: null,
  });

  const lastSyncRef = useRef<number>(0);
  const pendingUpdateRef = useRef<number | null>(null);

  // Fetch initial progress
  useEffect(() => {
    const fetchProgress = async () => {
      if (!videoId || !studentId) return;

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await getVideoProgress(videoId, studentId);

      if (response.success && response.data) {
        setState({
          watchedSeconds: response.data.watchedSeconds,
          lastPositionSeconds: response.data.lastPositionSeconds,
          progressPercentage: response.data.progressPercentage,
          isCompleted: response.data.isCompleted,
          isLoading: false,
          error: null,
        });
      } else {
        // No progress exists yet - that's okay
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchProgress();
  }, [videoId, studentId]);

  // Sync progress to backend
  const syncProgress = useCallback(
    async (positionSeconds: number, force = false) => {
      const now = Date.now();

      // Only sync if enough time has passed or forced
      if (!force && now - lastSyncRef.current < syncInterval) {
        pendingUpdateRef.current = positionSeconds;
        return;
      }

      lastSyncRef.current = now;
      pendingUpdateRef.current = null;

      const response = await updateVideoProgress(videoId, {
        studentId,
        positionSeconds,
      });

      if (response.success && response.data) {
        const wasCompleted = state.isCompleted;
        const isNowCompleted = response.data.isCompleted;

        setState(prev => ({
          ...prev,
          watchedSeconds: response.data!.watchedSeconds,
          lastPositionSeconds: response.data!.lastPositionSeconds,
          progressPercentage: response.data!.progressPercentage,
          isCompleted: isNowCompleted,
        }));

        // Trigger completion callback if newly completed
        if (!wasCompleted && isNowCompleted && onComplete) {
          onComplete();
        }
      }
    },
    [videoId, studentId, syncInterval, state.isCompleted, onComplete]
  );

  // Update position (called frequently during playback)
  const updatePosition = useCallback(
    (positionSeconds: number) => {
      setState(prev => ({ ...prev, lastPositionSeconds: positionSeconds }));
      syncProgress(positionSeconds);
    },
    [syncProgress]
  );

  // Force sync (call on pause, seek, or unmount)
  const forceSync = useCallback(() => {
    if (pendingUpdateRef.current !== null) {
      syncProgress(pendingUpdateRef.current, true);
    }
  }, [syncProgress]);

  // Cleanup - sync any pending progress
  useEffect(() => {
    return () => {
      if (pendingUpdateRef.current !== null) {
        // Fire and forget on unmount
        updateVideoProgress(videoId, {
          studentId,
          positionSeconds: pendingUpdateRef.current,
        });
      }
    };
  }, [videoId, studentId]);

  return {
    ...state,
    updatePosition,
    forceSync,
    resumePosition: state.lastPositionSeconds,
  };
}
