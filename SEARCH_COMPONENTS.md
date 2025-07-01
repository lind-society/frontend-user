# Komponen Search LIND Society

Dokumentasi untuk sistem pencarian yang telah dibuat untuk LIND Society.

## Komponen yang Dibuat

### 1. SearchBar (`src/components/ui/search-bar.tsx`)

Komponen utama untuk pencarian yang terintegrasi dengan navbar.

**Fitur:**

- Input pencarian dengan placeholder yang dinamis
- Pencarian real-time dengan delay 300ms
- Menampilkan hasil pencarian dalam dropdown
- Menampilkan saran pencarian populer ketika input kosong
- Loading state saat mencari
- Click outside untuk menutup dropdown

**Props:**

- Tidak ada props (menggunakan context dan hooks internal)

**Penggunaan:**

```tsx
import SearchBar from '@/components/ui/search-bar';

<SearchBar />;
```

### 2. SearchResultItem (`src/components/ui/search-result-item.tsx`)

Komponen untuk menampilkan item hasil pencarian individual.

**Fitur:**

- Tampilan card yang informatif
- Badge untuk kategori (Sewa/Beli/Aktivitas Wisata)
- Rating dan ulasan
- Informasi detail sesuai tipe (kamar, kamar mandi, tamu, dll)
- Hover effects
- Link ke halaman detail

**Props:**

```tsx
interface SearchResultItemProps {
  id: string;
  title: string;
  location: string;
  price: string;
  period: string;
  rating: number;
  reviews: number;
  image: string;
  type: 'rent' | 'buy' | 'tourist';
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  size?: string;
  duration?: string;
  groupSize?: string;
  onClick?: () => void;
}
```

### 3. SearchResults (`src/components/ui/search-results.tsx`)

Komponen untuk menampilkan hasil pencarian dengan fitur filter.

**Fitur:**

- Filter berdasarkan kategori (Semua/Sewa/Beli/Aktivitas)
- Header dengan informasi pencarian
- Footer dengan statistik hasil
- Tombol "Lihat Semua Hasil"

**Props:**

```tsx
interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onClose: () => void;
  onViewAll: () => void;
}
```

### 4. SearchSuggestions (`src/components/ui/search-suggestions.tsx`)

Komponen untuk menampilkan saran pencarian populer.

**Fitur:**

- Grid saran pencarian populer
- Kategorisasi (Lokasi/Properti/Aktivitas)
- Quick links ke kategori utama
- Statistik jumlah pencarian

**Props:**

```tsx
interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}
```

### 5. SearchPage (`src/app/(main)/search/page.tsx`)

Halaman hasil pencarian lengkap.

**Fitur:**

- Filter berdasarkan kategori
- Sorting (Relevansi/Harga/Rating/Ulasan)
- Tampilan grid hasil pencarian
- Loading state
- Empty state

## Data Dummy

Sistem menggunakan data dummy untuk testing yang mencakup:

### Sewa (Rent)

- Villa Sunset Paradise (Bali)
- Luxury Beach House (Lombok)
- Mountain View Villa (Bandung)

### Beli (Buy)

- Premium Apartment Unit (Jakarta Selatan)
- Luxury Villa Investment (Bali)
- Modern Townhouse (Surabaya)

### Aktivitas Wisata (Tourist)

- Bali Island Tour
- Komodo Dragon Adventure
- Yogyakarta Cultural Tour

## Integrasi dengan Navbar

SearchBar telah terintegrasi dengan navbar di:

- Desktop: `src/components/layouts/navbar.tsx`
- Mobile: Responsive design yang sama

## Fitur Pencarian

### 1. Real-time Search

- Pencarian dimulai setelah 2 karakter
- Delay 300ms untuk menghindari terlalu banyak request
- Mencari berdasarkan judul dan lokasi

### 2. Kategorisasi

- **Sewa (Rent)**: Villa, apartemen untuk disewa
- **Beli (Buy)**: Properti untuk dibeli
- **Aktivitas Wisata (Tourist)**: Tour dan aktivitas wisata

### 3. Filter dan Sorting

- Filter berdasarkan kategori
- Sorting berdasarkan relevansi, harga, rating, ulasan
- Tampilan jumlah hasil per kategori

### 4. UI/UX

- Design yang clean dan profesional
- Responsive untuk desktop dan mobile
- Loading states dan empty states
- Hover effects dan transitions
- Color coding untuk setiap kategori

## Cara Penggunaan

### 1. Pencarian Dasar

1. Klik pada input search di navbar
2. Ketik kata kunci (minimal 2 karakter)
3. Hasil akan muncul dalam dropdown
4. Klik item untuk melihat detail

### 2. Pencarian dengan Saran

1. Klik pada input search tanpa mengetik
2. Saran pencarian populer akan muncul
3. Klik saran untuk melakukan pencarian

### 3. Filter Hasil

1. Setelah hasil pencarian muncul
2. Gunakan tab filter untuk memilih kategori
3. Gunakan dropdown sorting untuk mengurutkan

### 4. Lihat Semua Hasil

1. Klik "Lihat Semua Hasil" di dropdown
2. Akan diarahkan ke halaman search lengkap
3. Gunakan filter dan sorting yang lebih lengkap

## Styling

Komponen menggunakan:

- Tailwind CSS untuk styling
- Lucide React untuk icons
- Color scheme yang konsisten:
  - Rent: Blue theme
  - Buy: Green theme
  - Tourist: Purple theme

## Responsive Design

- **Desktop**: SearchBar dengan dropdown yang lebar
- **Tablet**: SearchBar dengan ukuran yang disesuaikan
- **Mobile**: SearchBar dengan dropdown yang full-width

## Future Enhancements

1. **API Integration**: Mengganti data dummy dengan API real
2. **Search History**: Menyimpan riwayat pencarian
3. **Advanced Filters**: Filter berdasarkan harga, lokasi, dll
4. **Search Analytics**: Tracking pencarian populer
5. **Auto-complete**: Saran pencarian yang lebih cerdas
6. **Voice Search**: Pencarian dengan suara
7. **Image Search**: Pencarian berdasarkan gambar

## Troubleshooting

### Error yang Sering Muncul

1. **TypeScript Errors**: Pastikan tipe data sesuai dengan interface
2. **Image Not Found**: Pastikan path gambar benar
3. **Styling Issues**: Pastikan Tailwind CSS terinstall dengan benar

### Debug Tips

1. Gunakan browser dev tools untuk inspect komponen
2. Cek console untuk error messages
3. Pastikan semua dependencies terinstall
4. Test di berbagai ukuran layar

## Dependencies

- React 18+
- Next.js 14+
- TypeScript
- Tailwind CSS
- Lucide React
- Next-intl (untuk internationalization)
