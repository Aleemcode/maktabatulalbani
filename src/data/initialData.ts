import { Book, Category, BlogPost, StoreSettings } from '../types';

export const initialSettings: StoreSettings = {
  store_name: 'Maktabah Imam Albani',
  tagline: 'BothLife Centre & Library • Authentic Scholarly Literature',
  whatsapp_number: '2349124161597',
  whatsapp_default_message: 'Assalamu Alaykum Abu Abdillah, I would like to inquire about your books and the Jumu\'ah Deals.',
  currency_symbol: '₦',
  currency_code: 'NGN',
  announcement_banner: 'Jumu\'ah Deals Happening Every Friday After Jumu\'ah. 10% of all profits go directly to Zādut-Tālib Trust.',
  about_text: 'Maktabah Imam Albani is an authentic Islamic literature initiative powered by BothLife Centre and Library, dedicated to providing verified scholarly works upon the Quran and Sunnah according to the understanding of the Salaf us-Salih.',
  address: 'BothLife Centre and Library, Nigeria',
  instagram_handle: '@bothlifecentreandlibrary',
  email: 'info@bothlife.ng'
};

export const initialCategories: Category[] = [
  {
    id: 'student',
    slug: 'student-of-knowledge',
    name: 'Student of Knowledge & Mutoon',
    arabic_name: 'زاد طالب العلم والمتون',
    description: 'Methodology of seeking knowledge, Arabic grammar (Nahw), study guides, and classical texts for memorization.',
    icon: 'GraduationCap',
    order: 1
  },
  {
    id: 'hadith',
    slug: 'hadith-sunnah',
    name: 'Hadith & Sunnah',
    arabic_name: 'الحديث والسنة النبوية',
    description: 'Authentic collections, defense of the prophetic Sunnah, and verifications by classical and contemporary scholars.',
    icon: 'Scroll',
    order: 2
  },
  {
    id: 'tazkiyah',
    slug: 'tazkiyah-manners',
    name: 'Quran Manners & Heart Softeners',
    arabic_name: 'آداب القرآن والأخلاق والرقائق',
    description: 'Etiquette of the carriers of the Quran, character refinement, repentance, and spiritual cultivation.',
    icon: 'Heart',
    order: 3
  },
  {
    id: 'tafsir',
    slug: 'tafsir-quran',
    name: 'Tafsir & Quranic Sciences',
    arabic_name: 'التفسير وعلوم القرآن',
    description: 'Concise and classical explanations of the Holy Quran, essential jurisprudence, and daily Muslim guidance.',
    icon: 'BookOpen',
    order: 4
  },
  {
    id: 'albani-works',
    slug: 'albani-works',
    name: 'Works of Imam al-Albani',
    arabic_name: 'مؤلفات الإمام الألباني',
    description: 'Seminal compilations, verifications (Tahqiq), and hadith gradings by Allamah Muhammad Nasiruddin al-Albani.',
    icon: 'Award',
    order: 5
  },
  {
    id: 'aqeedah',
    slug: 'aqeedah-tawheed',
    name: 'Aqeedah & Tawheed',
    arabic_name: 'العقيدة والتوحيد',
    description: 'Foundational books on Islamic monotheism, the names and attributes of Allah, and the creed of Ahlus-Sunnah.',
    icon: 'Shield',
    order: 6
  }
];

export const initialBooks: Book[] = [
  {
    id: 'book-mumti-ajrumiyyah',
    slug: 'al-mumti-fi-sharh-al-ajrumiyyah',
    title: "Al-Mumti' fi Sharh al-Ajrumiyyah",
    arabic_title: 'الممتع في شرح الآجرّوميّة',
    author: 'أبو أنس مالك بن سالم بن مطر المهذري (رحمه الله)',
    publisher: 'منارة الكتب للنشر والتوزيع',
    price: 3500,
    category_id: 'student',
    cover_image: '/books/al-mumti-ajrumiyyah.jpg',
    description: 'الممتع في شرح الآجرّوميّة تأليف أبي أنس مالك بن سالم بن مطر المهذري (رحمه الله) مع تقديم فضيلة الشيخ العلامة مقبل بن هادي الوادعي (رحمه الله).\n\nشرح متقن وميسر لقواعد النحو العربي للمبتدئين وطلبة العلم، يعتمد التطبيق العملي والإعراب والشواهد القرآنية الواضحة لتسهيل فهم مقدمة ابن آجروم.',
    pages: 320,
    binding: 'Paperback',
    language: 'Arabic',
    isbn: '978-9957-0012',
    in_stock: true,
    featured: true,
    created_at: '2026-09-23T10:00:00Z',
    updated_at: '2026-09-23T10:00:00Z'
  },
  {
    id: 'book-mahajjah-bayda',
    slug: 'al-mahajjah-al-bayda',
    title: "Al-Mahajjah al-Bayda' fi Himayati as-Sunnah al-Gharra'",
    arabic_title: 'المحجة البيضاء في حماية السنة الغراء من زلات أهل الأخطاء وزيغ أهل الأهواء',
    author: 'فضيلة الشيخ العلامة ربيع بن هادي عمير المدخلي (رحمه الله)',
    publisher: 'دار المنهج',
    price: 3500,
    category_id: 'hadith',
    cover_image: '/books/al-mahajjah-al-bayda.jpg',
    description: 'المحجة البيضاء في حماية السنة الغراء من زلات أهل الأخطاء وزيغ أهل الأهواء، لفضيلة الشيخ العلامة ربيع بن هادي عمير المدخلي (رحمه الله) رئيس قسم السنة بالجامعة الإسلامية بالمدينة النبوية سابقاً.\n\nكتاب منهجي أصيل في الدفاع عن السنة النبوية، وحمايتها من الدخيل والشبهات، وترسيخ منهج السلف الصالح في لزوم الأثر والتحذير من البدع والمحدثات.',
    pages: 360,
    binding: 'Paperback',
    language: 'Arabic',
    isbn: '978-9960-4412',
    in_stock: true,
    featured: true,
    created_at: '2026-09-23T10:00:00Z',
    updated_at: '2026-09-23T10:00:00Z'
  },
  {
    id: 'book-tafseer-ushr-akhir',
    slug: 'tafseer-al-ushr-al-akhir',
    title: "Tafseer al-'Ushr al-Akhir (The Last Tenth of the Noble Quran)",
    arabic_title: 'تفسير العشر الأخير من كتاب مختصر في تفسير القرآن الكريم ويليه أحكام تهم المسلم',
    author: 'الشيخ محمد سليمان الأشقر (رحمه الله)',
    publisher: 'www.tafseer.info',
    price: 2000,
    category_id: 'tafsir',
    cover_image: '/books/tafseer-al-ushr-al-akhir.jpg',
    description: 'تفسير العشر الأخير من كتاب مختصر في تفسير القرآن الكريم ويليه أحكام تهم المسلم، للشيخ محمد سليمان الأشقر (رحمه الله).\n\nدليل جامع لكل مسلم ومسلمة يحتوي على تفسير الأجزاء الثلاثة الأخيرة من القرآن الكريم، مع فصول ملحقة في أركان الإسلام والإيمان، وأحكام الطهارة والصلاة، والأذكار المأثورة والرقية الشرعية.',
    pages: 140,
    binding: 'Paperback',
    language: 'Arabic',
    isbn: '978-603-00-1425-6',
    in_stock: true,
    featured: true,
    created_at: '2026-09-23T10:00:00Z',
    updated_at: '2026-09-23T10:00:00Z'
  },
  {
    id: 'book-tibyan-an-nawawi',
    slug: 'at-tibyan-fi-adabi-hamalatil-quran',
    title: 'At-Tibyan fi Adabi Hamalatil Quran & Akhlaq Hamalatil Quran',
    arabic_title: 'التبيان في آداب حملة القرآن للإمام النووي ويليه أخلاق حملة القرآن للإمام الآجري',
    author: 'للإمام أبي زكريا يحيى بن شرف النووي ويليه للإمام أبي بكر الآجري',
    publisher: 'دار الإتباع للنشر والتوزيع',
    price: 3500,
    category_id: 'tazkiyah',
    cover_image: '/books/at-tibyan-an-nawawi.jpg',
    description: 'كتاب جامع يضم اثنين من أعظم مصنفات آداب القرآن الكريم:\n1. التبيان في آداب حملة القرآن للإمام محيي الدين أبي زكريا يحيى بن شرف النووي (المتوفى سنة 676 هـ).\n2. ويليه: أخلاق حملة القرآن للإمام أبي بكر محمد بن الحسين بن عبد الله الآجري (المتوفى سنة 360 هـ).\n\nطبعة محققة ومنقحة ومضبوطة بالشكل ومخرجة الأحاديث، لا غنى عنها لكل حافظ وقارئ ومعلم لكتاب الله تعالى.',
    pages: 280,
    binding: 'Paperback',
    language: 'Arabic',
    isbn: '978-9957-6582',
    in_stock: true,
    featured: true,
    created_at: '2026-09-23T10:00:00Z',
    updated_at: '2026-09-23T10:00:00Z'
  },
  {
    id: 'book-ashal-tariqah-qasim',
    slug: 'ashal-tariqah-li-hifdhil-quran-wal-mutoon',
    title: 'Ashal Tariqah li Hifdhil Quranil Kareem & Hifdhi al-Mutoon al-Ilmiyyah',
    arabic_title: 'أسهل طريقة لحفظ القرآن الكريم & أسهل طريقة لحفظ المتون العلمية وطلب العلم الشرعي',
    author: 'فضيلة الشيخ د. عبد المحسن بن محمد القاسم (حفظه الله)',
    publisher: 'إمام وخطيب المسجد النبوي الشريف',
    price: 2500,
    category_id: 'student',
    cover_image: '/books/ashal-tariqah-al-qasim.png',
    description: 'كتيبان منهجيان تأصيليان لفضيلة الشيخ الدكتور عبد المحسن بن محمد القاسم (إمام وخطيب المسجد النبوي الشريف):\n\n1. أسهل طريقة لحفظ القرآن الكريم وإتقان مراجعته وضبط أوجهه.\n2. أسهل طريقة لحفظ المتون العلمية وطلب العلم الشرعي والتدرج في المراتب العلمية.\n\nالسعر: ₦2,500 للنسخة (2,500/Copy). رسالتان مجربتان نافعتان لضبط الحفظ والرسوخ في التحصيل.',
    pages: 64,
    binding: 'Paperback',
    language: 'Arabic',
    isbn: '978-603-01-2299-1',
    in_stock: true,
    featured: true,
    created_at: '2026-09-23T10:00:00Z',
    updated_at: '2026-09-23T10:00:00Z'
  },
  {
    id: 'book-prophets-prayer',
    slug: 'the-prophets-prayer-described',
    title: "The Prophet's Prayer Described",
    arabic_title: 'صفة صلاة النبي صلى الله عليه وسلم من التكبير إلى التسليم',
    author: 'Shaykh Muhammad Nasiruddin al-Albani',
    publisher: 'Al-Hidaayah / Maktabah al-Maarif',
    translator: 'Usama ibn Suhaib Hasan',
    price: 18500,
    discount_price: 16500,
    category_id: 'albani-works',
    cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    description: 'A monumental and definitive masterpiece reconstructing the exact prayer of the Prophet Muhammad from the opening Takbeer to the final Tasleem, supported by verified authentic chains of transmission (Isnad). An indispensable guide for every Muslim striving to worship Allah precisely as instructed.',
    pages: 288,
    binding: 'Hardcover',
    language: 'English',
    isbn: '978-1898649403',
    in_stock: true,
    featured: true,
    created_at: '2026-09-01T00:00:00Z',
    updated_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'book-silsilat-sahihah',
    slug: 'silsilat-al-ahadith-as-sahihah',
    title: 'Silsilat al-Ahadith as-Sahihah (Volume Set)',
    arabic_title: 'سلسلة الأحاديث الصحيحة وشيء من فقهها وفوائدها',
    author: 'Shaykh Muhammad Nasiruddin al-Albani',
    publisher: 'Maktabah al-Maarif, Riyadh',
    price: 95000,
    category_id: 'albani-works',
    cover_image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    description: 'The monumental life-work of the Muhaddith of our era, Shaykh al-Albani. A multi-volume compendium extracting authentic narrations from rare manuscripts, providing in-depth Takhrij, critical analysis, and profound jurisprudential benefits.',
    pages: 3400,
    binding: 'Hardcover',
    language: 'Arabic',
    isbn: '978-9960241050',
    in_stock: true,
    featured: false,
    created_at: '2026-09-01T00:00:00Z',
    updated_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'book-sahih-adab-mufrad',
    slug: 'sahih-al-adab-al-mufrad',
    title: 'Sahih al-Adab al-Mufrad: Islamic Manners',
    arabic_title: 'صحيح الأدب المفرد للإمام البخاري',
    author: 'Imam al-Bukhari (Checked by Shaykh al-Albani)',
    publisher: 'Darussalam / Salafi Publications',
    price: 24000,
    discount_price: 21500,
    category_id: 'hadith',
    cover_image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=800',
    description: "Imam al-Bukhari's famous dedicated hadith collection on elevated morals, family relationships, hospitality, speech, and neighborly conduct, verified rigorously by Shaykh Muhammad Nasiruddin al-Albani.",
    pages: 640,
    binding: 'Hardcover',
    language: 'English',
    isbn: '978-9960983806',
    in_stock: true,
    featured: false,
    created_at: '2026-09-01T00:00:00Z',
    updated_at: '2026-09-01T00:00:00Z'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'why-every-seeker-needs-a-personal-library',
    title: 'Building a Fortified Home: Why Every Muslim Seeker Needs a Personal Library',
    excerpt: 'Books are not mere interior decorations; they are living mentors, protectors of family creed, and springs of scholarly guidance during times of confusion.',
    content: `
# Building a Fortified Home: Why Every Muslim Seeker Needs a Personal Library

In a world increasingly overwhelmed by fragmented digital feeds, bite-sized opinions, and transient content, the physical book remains an enduring sanctuary for serious contemplation.

The classical scholars understood that an authentic library in a household serves as a spiritual fortress. Imam Ibn al-Jawzi (rahimahullah) famously remarked on the joy of sitting with books, noting that through them, one speaks across centuries to the greatest minds of the Ummah.

## 1. Physical Presence Shapes Family Identity
When children grow up seeing shelves filled with the Quran, authentic Hadith collections, and classical books of Fiqh, their subconscious foundation recognizes knowledge as precious. A home without books is like a house without windows.

## 2. Uninterrupted Contemplation
Unlike a screen, which constantly tempts the mind with notifications, tabs, and algorithmic distractions, a physical book demands presence. You sit with the author's argument, absorb the proof, and reflect deeply on the texts.

## 3. Essential Core Volumes to Begin With
Every home library should start with three foundational pillars:
- Aqeedah (Sound Creed): Al-Mahajjah al-Bayda' and Kitab at-Tawheed.
- Quran & Tajweed: At-Tibyan fi Adabi Hamalatil Quran by Imam an-Nawawi.
- Arabic Grammar: Al-Mumti' fi Sharh al-Ajrumiyyah by Abu Anas al-Mahdhari.

At Maktabah Imam Albani, we make it our ongoing mission to help you curate your family collection one authentic volume at a time.
    `,
    author: 'Editorial Team, Maktabah Imam Albani',
    cover_image: 'https://images.unsplash.com/photo-1507842229451-7f01be45c06b?auto=format&fit=crop&q=80&w=1200',
    published: true,
    read_time: '5 min read',
    tags: ['Reading Culture', 'Seeker of Knowledge', 'Home Library', 'Islamic Education'],
    featured_book_ids: ['book-mumti-ajrumiyyah', 'book-tibyan-an-nawawi', 'book-mahajjah-bayda'],
    created_at: '2026-09-10T12:00:00Z',
    updated_at: '2026-09-10T12:00:00Z'
  },
  {
    id: 'post-2',
    slug: 'understanding-the-hadith-methodology-of-shaykh-al-albani',
    title: 'A Beacon in the Science of Hadith: Understanding the Methodology of Shaykh al-Albani',
    excerpt: 'An insightful overview into how the 20th-century Muhaddith revived the rigorous standard of hadith verification for contemporary readers.',
    content: `
# A Beacon in the Science of Hadith: Understanding the Methodology of Shaykh al-Albani

Shaykh Muhammad Nasiruddin al-Albani (1914-1999) was one of the most prolific and transformative scholars of the science of Hadith in contemporary Islamic history. 

His life-long devotion to unearthing rare manuscripts at the Dhahiriyyah Library in Damascus and meticulously checking chains of transmission (Asaneed) left an indelible mark on modern Islamic literature.

## The Principle of Tasfiyyah and Tarbiyyah
Shaykh al-Albani emphasized two twin pillars:
1. Tasfiyyah (Purification): Cleansing religious literature from fabricated narrations (Mawdoo'), weak reports (Da'eef), and unauthorized innovations that crept into people's religious practice over generations.
2. Tarbiyyah (Cultivation): Raising individuals and communities upon this purified and authentic understanding of the Quran and Sunnah according to the Companions.

## Why His Tahqiq (Verification) Matters to the Everyday Reader
When you open books like The Prophet's Prayer Described or Sahih Sunan Abi Dawood, you are reading narrations that have withstood rigorous scrutiny against the standards established by the classical Imams of Hadith.
    `,
    author: 'Maktabah Imam Albani Scholarly Review',
    cover_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200',
    published: true,
    read_time: '7 min read',
    tags: ['Imam al-Albani', 'Hadith Science', 'Sunnah', 'Scholarly Heritage'],
    featured_book_ids: ['book-prophets-prayer', 'book-silsilat-sahihah'],
    created_at: '2026-09-15T09:30:00Z',
    updated_at: '2026-09-15T09:30:00Z'
  }
];
