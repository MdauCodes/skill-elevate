import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Briefcase, Clock, Lock, CheckCircle, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { jobs, courses } from '@/data/mockData';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
const locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Remote', 'Hybrid'];

export default function JobsPage() {
  const { hasCompleted } = useAuth();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showQualifiedOnly, setShowQualifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.requiredSkills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Job type filter
    if (selectedTypes.length > 0) {
      result = result.filter(job => selectedTypes.includes(job.type));
    }

    // Location filter
    if (selectedLocations.length > 0) {
      result = result.filter(job =>
        selectedLocations.some(loc => job.location.toLowerCase().includes(loc.toLowerCase()))
      );
    }

    // Qualified only filter
    if (showQualifiedOnly) {
      result = result.filter(job =>
        job.requiredCourses.every(courseId => hasCompleted(courseId))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'salary-high':
        result.sort((a, b) => {
          const aMax = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bMax = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return bMax - aMax;
        });
        break;
    }

    return result;
  }, [searchQuery, selectedTypes, selectedLocations, showQualifiedOnly, sortBy, hasCompleted]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedLocations([]);
    setShowQualifiedOnly(false);
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedTypes.length > 0 ||
    selectedLocations.length > 0 ||
    showQualifiedOnly;

  const qualifiedJobsCount = jobs.filter(job =>
    job.requiredCourses.every(courseId => hasCompleted(courseId))
  ).length;

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Qualified Jobs Toggle */}
      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="qualified-only"
            checked={showQualifiedOnly}
            onCheckedChange={(checked) => setShowQualifiedOnly(checked as boolean)}
          />
          <Label htmlFor="qualified-only" className="cursor-pointer">
            <span className="font-medium">Show jobs I qualify for</span>
            <p className="text-sm text-muted-foreground mt-0.5">
              {qualifiedJobsCount} jobs available
            </p>
          </Label>
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h4 className="font-semibold mb-4">Job Type</h4>
        <div className="space-y-3">
          {jobTypes.map(type => (
            <div key={type} className="flex items-center space-x-3">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h4 className="font-semibold mb-4">Location</h4>
        <div className="space-y-3">
          {locations.map(location => (
            <div key={location} className="flex items-center space-x-3">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              />
              <Label htmlFor={`location-${location}`} className="text-sm cursor-pointer">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Job Opportunities</h1>
            <p className="text-muted-foreground mt-2">
              {filteredJobs.length} jobs available for skilled professionals
            </p>
          </div>

          {/* Info Banner */}
          <div className="mb-8 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-turquoise/10 border border-primary/20">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">🔓 Unlock more opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Complete courses to qualify for more job positions. Employers value certified skills!
                </p>
              </div>
              <Button asChild className="btn-primary shrink-0">
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                <FilterPanel />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search & Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search jobs, skills, or companies..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-12 h-12"
                  />
                </div>

                {/* Controls */}
                <div className="flex gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden h-12">
                        <SlidersHorizontal className="w-5 h-5 mr-2" />
                        Filters
                        {hasActiveFilters && (
                          <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            !
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterPanel />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 h-12">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results */}
              {filteredJobs.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
