import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { courses, categories } from '@/data/mockData';

const sortOptions = [
  { value: 'trending', label: 'Trending' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const levelOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const durationOptions = [
  { label: '0-5 hours', min: 0, max: 5 },
  { label: '5-10 hours', min: 5, max: 10 },
  { label: '10+ hours', min: 10, max: 100 },
];

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.title.toLowerCase().includes(query) ||
          c.shortDescription.toLowerCase().includes(query) ||
          c.tutor.name.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(c => selectedCategories.includes(c.category.slug));
    }

    // Level filter
    if (selectedLevel !== 'All') {
      result = result.filter(c => c.level === selectedLevel);
    }

    // Price filter
    result = result.filter(c => c.price >= priceRange[0] && c.price <= priceRange[1]);

    // Duration filter
    if (selectedDurations.length > 0) {
      result = result.filter(c => {
        const hours = parseFloat(c.duration);
        return selectedDurations.some(d => {
          const opt = durationOptions.find(o => o.label === d);
          return opt && hours >= opt.min && hours < opt.max;
        });
      });
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter(c => c.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'trending':
      default:
        result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategories, selectedLevel, priceRange, selectedDurations, minRating, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  const toggleDuration = (label: string) => {
    setSelectedDurations(prev =>
      prev.includes(label) ? prev.filter(d => d !== label) : [...prev, label]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedLevel('All');
    setPriceRange([0, 50000]);
    setSelectedDurations([]);
    setMinRating(0);
    setSortBy('trending');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedLevel !== 'All' ||
    priceRange[0] > 0 ||
    priceRange[1] < 50000 ||
    selectedDurations.length > 0 ||
    minRating > 0;

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              <Label htmlFor={category.id} className="text-sm cursor-pointer flex-1">
                {category.name}
                <span className="text-muted-foreground ml-1">({category.courseCount})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Level */}
      <div>
        <h4 className="font-semibold mb-4">Skill Level</h4>
        <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
          {levelOptions.map(level => (
            <div key={level} className="flex items-center space-x-3">
              <RadioGroupItem value={level} id={`level-${level}`} />
              <Label htmlFor={`level-${level}`} className="text-sm cursor-pointer">
                {level}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-4">
          Price Range
          <span className="text-sm font-normal text-muted-foreground ml-2">
            KES {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
          </span>
        </h4>
        <Slider
          value={priceRange}
          min={0}
          max={50000}
          step={1000}
          onValueChange={setPriceRange}
          className="mt-2"
        />
      </div>

      {/* Duration */}
      <div>
        <h4 className="font-semibold mb-4">Duration</h4>
        <div className="space-y-3">
          {durationOptions.map(opt => (
            <div key={opt.label} className="flex items-center space-x-3">
              <Checkbox
                id={`duration-${opt.label}`}
                checked={selectedDurations.includes(opt.label)}
                onCheckedChange={() => toggleDuration(opt.label)}
              />
              <Label htmlFor={`duration-${opt.label}`} className="text-sm cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold mb-4">Minimum Rating</h4>
        <RadioGroup value={minRating.toString()} onValueChange={v => setMinRating(Number(v))}>
          {[0, 3, 3.5, 4, 4.5].map(rating => (
            <div key={rating} className="flex items-center space-x-3">
              <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                {rating === 0 ? 'All Ratings' : `${rating}+ stars`}
              </Label>
            </div>
          ))}
        </RadioGroup>
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
            <h1 className="text-3xl md:text-4xl font-bold">All Courses</h1>
            <p className="text-muted-foreground mt-2">
              Discover {filteredCourses.length} courses to advance your career
            </p>
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
                    placeholder="Search courses..."
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
                      {sortOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 ${viewMode === 'grid' ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 ${viewMode === 'list' ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} variant="horizontal" />
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
