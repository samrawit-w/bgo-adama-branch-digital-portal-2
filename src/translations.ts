import { Language } from './types';

export const translations: Record<Language, Record<string, string>> = {
  om: {
    // Nav & Header
    'nav.home': 'Teessoo',
    'nav.services': 'Tajaajila',
    'nav.community': 'Hawaasa & Miidiyaa',
    'nav.contribution': 'Buusii & Gargaarsa',
    'nav.contact': 'Quunnanamti',
    'nav.admin': 'Bulchiinsa CMS',
    'nav.portal_title': 'Busaa Gonofaa Oromiyaa',
    'nav.portal_subtitle': 'Damee Adaamaa',

    // Hero Section
    'hero.title': 'Dugda Duuba Hawaasa Keenyaa, Wabii Misooma Keessanii!',
    'hero.subtitle': 'Busaa Gonofaa Oromiyaa (BGO) - Damee Adaamaa, waldaan maaykiroo-faayinaansii hawaas-focus ta’een tajaajila qusannoo, liqii fi inshuraansii qonnaa dhiyeessuun jireenya hawaasa keenyaa ni foyyessina.',
    'btn.open_account': 'Hoorata Qusanoo Bani',
    'btn.apply_loan': 'Liqiif Iyyadhu',
    'btn.make_contribution': 'Buusii Takki Busa',
    'btn.contact_us': 'Nu Quunnamaa',

    // About Section
    'about.title': 'Waa’ee Keenya',
    'about.history_title': 'Seenaa Damee Keenyaa',
    'about.history_text': 'Dameen Adaamaa tajaajila maaykiroo-faayinaansii dhiyeessuun qonnaan bultootaa fi daldaltoota xixiqqoo magaalichaa fi naannawa ishee waggoota hedduuf tajaajileera. Kaayyoon keenya maallaqa qusachuu fi liqii gahaa mijeessuun hawaasa jabeessuudha.',
    'about.vision_title': 'Mul’ata Keenya',
    'about.vision_text': 'Naannoo Oromiyaa keessatti waldaa tajaajila faayinaansii dhiyeessuun, hiyyummaa dhabamsiisuu fi qaroomina diinagdee bishaan kessaa uumuun kaaba ta’e ta’u.',
    'about.mission_title': 'Ergaa Keenya',
    'about.mission_text': 'Tajaajiloota faayinaansii mijaawaa, amanamoo fi qulqulluu qajeelfama gargaarsa aadaa "Busaa Gonofaa" bu’uureffatanii fi teeknooloojiin deeggaraman hawaasaaf dhiyeessuu.',

    // Stats
    'stats.members': 'Miseensota Maamiloota',
    'stats.loans': 'Liqii Kenname',
    'stats.savings': 'Herrega Qusannoo',
    'stats.projects': 'Projeektota Hawaasaa',

    // Supporting Campaigns
    'campaigns.title': 'Duula Gargaarsa Hawaasaa',
    'campaigns.subtitle': 'Duula ariifachiisaa maallaqa fi deeggarsa hawaasa naannoo Adaamaa gargaaruuf hirmaadhaa.',
    'campaigns.target': 'Target',
    'campaigns.raised': 'Kan Walitti Qabame',
    'campaigns.donate_btn': 'Deeggarsa Kenni',
    'campaigns.no_campaigns': 'Yeroo ammaa duulli banaa ta’e hin jiru.',

    // News
    'news.title': 'Oduu fi Beeksisa Haaraa',
    'news.subtitle': 'Oduu, beeksisoota fi barumsa faayinaansii dhimma BGO Damee Adaamaa wal qabatan hordofaa.',
    'news.read_more': 'Guutuu Dubbisi',

    // Services
    'services.title': 'Tajaajila Faayinaansii Keenya',
    'services.subtitle': 'Gosa qusannoo, liqawaa fi inshuraansii haala jireenya hawaasa naannoo keenyaa mijeessuuf qophaaye.',
    'services.savings_title': 'Kkf Qusannoo',
    'services.loans_title': 'Kkf Liqii',
    'services.insurance_title': 'Inshuraansii',
    'services.eligibility': 'Ulaagaa Maamilaa',
    'services.requirements': 'Sanadoota Barbaachisan',
    'services.benefits': 'Faayidaa fi Bu’aa',
    'services.apply_now': 'Iyyadhu Amma',

    // Community & Media
    'community.title': 'Hawaasumma & Miidiyaa',
    'community.events_title': 'Sagantaalee fi Walgahiiwwan',
    'community.gallery_title': 'Fakkiiwwan Gadaa fi Qophii',
    'community.gallery_all': 'Hunda',
    'community.gallery_photos': 'Suuraalee',
    'community.gallery_videos': 'Viidiyoolee',
    'community.gallery_events': 'Qophii Hawaasaa',

    // Contribution Portal
    'contrib.portal_title': 'Buusii Dijitaalaa & Deeggarsa',
    'contrib.subtitle': 'Gumaacha keessan jireenya qilleensaa fi hojii gargaarsa hawaasaa Adaamaa foyyeessuuf ammaan tana ergadhaa.',
    'contrib.form_header': 'Gumaacha keessan ergaa',
    'contrib.name': 'Maqaa Guutuu',
    'contrib.email': 'Imeelii',
    'contrib.phone': 'Lakk. Bilbilaa',
    'contrib.amount': 'Hamma Buusii (ETB)',
    'contrib.purpose': 'Kaayyoo Buusii',
    'contrib.payment_method': 'Haala Kaffaltii',
    'contrib.submit': 'Kaffaltii Ergi',
    'contrib.success_msg': 'Gumaacha keessan nagaan fudhannee jirra. Galatoomaa!',
    'contrib.recent': 'Gumaacha Dhiheenya Keessan',
    'contrib.dashboard_total': 'Buusii Waligalaa',
    'contrib.dashboard_campaigns': 'Duulota Gulaalamaa',
    'contrib.dashboard_donors': 'Gumaachitoota Hunda',

    // Contact Us
    'contact.title': 'Nu Quunnamaa',
    'contact.subtitle': 'Gaffi ykn gorsa yoo qabaattan nu quunnamaa. Dameen Adaamaa yeroo hunda isiniif qophaaye.',
    'contact.address_label': 'Teessoo',
    'contact.phone_label': 'Bilbila',
    'contact.email_label': 'Imeelii',
    'contact.hours_label': 'Sa’aa Hojii',
    'contact.form_title': 'Yeroo Ammaan Tana Nuuf Barreessi',
    'contact.name_input': 'Maqaa keessan',
    'contact.email_input': 'Imeelii keessan',
    'contact.subject_input': 'Dhimma keessan',
    'contact.message_input': 'Ergaa keessan',
    'contact.send_btn': 'Ergi',
    'contact.map_title': 'Teessoo Mukeen Damee Adaamaa (Interactive Map)',

    // Admin
    'admin.title': 'Bulchiinsa CMS & Analytics',
    'admin.subtitle': 'Oduu, sagantaa, gumaachaa fi ergaa namootaa dhimma website bulchiinsaaf.',
    'admin.add_news': 'Oduu Haaraa Dabali',
    'admin.add_event': 'Sagantaa Haaraa Dabali',
    'admin.news_list': 'Tarree Oduu',
    'admin.event_list': 'Tarree Sagantaa',
    'admin.messages': 'Ergaalee Quunnamtii',
    'admin.donations': 'Buusii Hawaasaa',
    'admin.reports': 'Gabaasa Faayinaansii',
  },
  am: {
    // Nav & Header
    'nav.home': 'ዋና ገጽ',
    'nav.services': 'አገልግሎቶች',
    'nav.community': 'ማህበረሰብ እና ሚዲያ',
    'nav.contribution': 'ማህበረሰብ መዋጮ',
    'nav.contact': 'አግኙን',
    'nav.admin': 'የሲኤምኤስ አስተዳደር',
    'nav.portal_title': 'ቡሳ ጎኖፋ ኦሮሚያ',
    'nav.portal_subtitle': 'የአዳማ ቅርንጫፍ',

    // Hero Section
    'hero.title': 'ለማህበረሰባችን ደጀን፣ ለልማትዎ ዋስትና!',
    'hero.subtitle': 'ቡሳ ጎኖፋ ኦሮሚያ (BGO) የአዳማ ቅርንጫፍ - ቁጠባን፣ ብድርን እና አነስተኛ የግብርና መድንን በማቅረብ የማህበረሰባችንን ህይወት የሚያሻሽል ማህበረሰብ-ተኮር ማይክሮፋይናንስ ተቋም ነው።',
    'btn.open_account': 'የቁጠባ ሂሳብ ይክፈቱ',
    'btn.apply_loan': 'የብድር ማመልከቻ',
    'btn.make_contribution': 'መዋጮ ያድርጉ',
    'btn.contact_us': 'ያግኙን',

    // About Section
    'about.title': 'ስለ እኛ',
    'about.history_title': 'የቅርንጫፉ ታሪክ',
    'about.history_text': 'የአዳማ ቅርንጫፍ ለአዳማ ከተማ እና አካባቢዋ ገበሬዎችና አነስተኛ ነጋዴዎች የማይክሮ ፋይናንስ አገልግሎትን ለረጅም አመታት ሲያቀርብ ቆይቷል። አላማችን ጠንካራና የዳበረ ማህበረሰብ መፍጠር ነው።',
    'about.vision_title': 'ራዕያችን',
    'about.vision_text': 'በኦሮሚያ ክልል ውስጥ የቁጠባና ብድር አገልግሎት ተደራሽነትን በማስፋት የአጠቃላይ ማህበረሰቡን የኑሮ ጥራት ማሻሻልና ድህነትን ማስወገድ።',
    'about.mission_title': 'ተልዕኳችን',
    'about.mission_text': 'ቀልጣፋ፣ እምነት የሚጣልበት እና በባህላዊው "ቡሳ ጎኖፋ" የጋራ ድጋፍ መርህ ላይ የተመሰረተ ፈጣን የማይክሮፋይናንስ አገልግሎትን በቴክኖሎጂ ታግዞ ማቅረብ።',

    // Stats
    'stats.members': 'ንቁ አባላት ቁጥር',
    'stats.loans': 'የተሰጠ ጠቅላላ ብድር',
    'stats.savings': 'የቁጠባ ሂሳቦች ብዛት',
    'stats.projects': 'የማህበረሰብ ፕሮጀክቶች',

    // Supporting Campaigns
    'campaigns.title': 'የማህበረሰብ ድጋፍ ዘመቻዎች',
    'campaigns.subtitle': 'የአዳማ ማህበረሰብን ለመርዳት የሚደረጉ አፋጣኝ የገንዘብና የቁሳቁስ ድጋፍ ዘመቻዎችን ይሳተፉ።',
    'campaigns.target': 'ግብ',
    'campaigns.raised': 'የተሰበሰበው',
    'campaigns.donate_btn': 'ይደግፉ',
    'campaigns.no_campaigns': 'በአሁኑ ጊዜ ምንም ንቁ ዘመቻ የለም።',

    // News
    'news.title': 'አዳዲስ ዜናዎችና ማስታወቂያዎች',
    'news.subtitle': 'ስለ አዳማ BGO ቅርንጫፍ ዜናዎች፣ ማስታወቂያዎችና የበጀት እውቀት ማሻሻያ መረጃዎችን ይከታተሉ።',
    'news.read_more': 'ሙሉውን ያንብቡ',

    // Services
    'services.title': 'የፋይናንስ አገልግሎቶቻችን',
    'services.subtitle': 'የእርስዎን እና የማህበረሰቡን ፍላጎት መሰረት ያደረጉ የቁጠባ፣ የብድርና የመድን አገልግሎቶች።',
    'services.savings_title': 'የቁጠባ አገልግሎቶች',
    'services.loans_title': 'የብድር ምርቶች',
    'services.insurance_title': 'የመድን (ኢንሹራንስ) አገልግሎት',
    'services.eligibility': 'የብቃት መስፈርት',
    'services.requirements': 'አስፈላጊ ዶክመንቶች',
    'services.benefits': 'ጥቅምና ጥቅማጥቅሞች',
    'services.apply_now': 'አሁኑኑ ያመልክቱ',

    // Community & Media
    'community.title': 'ማህበረሰብ እና ሚዲያ',
    'community.events_title': 'መጪ ክንዋኔዎችና ስብሰባዎች',
    'community.gallery_title': 'የማህበረሰብ ዝግጅቶች ፎቶዎች',
    'community.gallery_all': 'ሁሉም',
    'community.gallery_photos': 'ፎቶዎች',
    'community.gallery_videos': 'ቪዲዮዎች',
    'community.gallery_events': 'ክንዋኔዎች',

    // Contribution Portal
    'contrib.portal_title': 'ዲጂታል መዋጮና ድጋፍ',
    'contrib.subtitle': 'ለአዳማ ማህበረሰብ ልማትና ለአካባቢያዊ የበጎ አድራጎት ፕሮጀክቶች የእርስዎን ድጋፍ በዲጂታል ይላኩ።',
    'contrib.form_header': 'መዋጮዎን በእኛ ፖርታል ይላኩ',
    'contrib.name': 'ሙሉ ስም',
    'contrib.email': 'ኢሜይል',
    'contrib.phone': 'ስልክ ቁጥር',
    'contrib.amount': 'የመዋጮ መጠን (ETB)',
    'contrib.purpose': 'የመዋጮው አላማ',
    'contrib.payment_method': 'የክፍያ አማራጭ',
    'contrib.submit': 'ክፍያውን ፈጽም',
    'contrib.success_msg': 'መዋጮዎ በተሳካ ሁኔታ ደርሶናል! እናመሰግናለን!',
    'contrib.recent': 'የቅርብ ጊዜ መዋጮዎች',
    'contrib.dashboard_total': 'አጠቃላይ የተሰበሰበ መዋጮ',
    'contrib.dashboard_campaigns': 'ንቁ የልማት ፕሮጀክቶች',
    'contrib.dashboard_donors': 'ጠቅላላ ደጋፊዎች',

    // Contact Us
    'contact.title': 'ያግኙን',
    'contact.subtitle': 'ለማንኛውም ጥያቄ ወይም አስተያየት እኛን ለማግኘት አያቅማሙ። የአዳማው ቅርንጫፋችን ምንጊዜም ለእርስዎ ክፍት ነው።',
    'contact.address_label': 'አድራሻ',
    'contact.phone_label': 'ስልክ',
    'contact.email_label': 'ኢሜይል',
    'contact.hours_label': 'የስራ ሰዓት',
    'contact.form_title': 'መልዕክት ይላኩልን',
    'contact.name_input': 'ስምዎ',
    'contact.email_input': 'ኢሜይልዎ',
    'contact.subject_input': 'ርዕስ',
    'contact.message_input': 'መልዕክት',
    'contact.send_btn': 'ላክ',
    'contact.map_title': 'የአዳማ ማስተራገቢያ ቅርንጫፎች ካርታ (Interactive Map)',

    // Admin
    'admin.title': 'የሲኤምኤስ አስተዳዳሪ ሰሌዳ',
    'admin.subtitle': 'ዜናዎችን፣ ክንዋኔዎችን፣ መዋጮዎችንና የተጠቃሚዎች መልዕክት የመቆጣጠሪያ ፓነል።',
    'admin.add_news': 'አዲስ ዜና ፍጠር',
    'admin.add_event': 'አዲስ ክንዋኔ ፍጠር',
    'admin.news_list': 'የዜናዎች ዝርዝር',
    'admin.event_list': 'የክንዋኔዎች ዝርዝር',
    'admin.messages': 'የደረሱ መልዕክቶች',
    'admin.donations': 'የማህበረሰብ መዋጮዎች',
    'admin.reports': 'የፋይናንስ ሪፖርቶች',
  },
  en: {
    // Nav & Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.community': 'Community & Media',
    'nav.contribution': 'Contribution Portal',
    'nav.contact': 'Contact Us',
    'nav.admin': 'CMS Admin',
    'nav.portal_title': 'Busaa Gonofaa Oromiyaa',
    'nav.portal_subtitle': 'Adama Branch',

    // Hero Section
    'hero.title': 'Backbone of Our Community, Shield for Your Progress!',
    'hero.subtitle': 'Busaa Gonofaa Oromiyaa (BGO) - Adama Branch is a community-first microfinance institution offering savings products, micro-loans, and customized agricultural insurance to elevate local lives and support the community.',
    'btn.open_account': 'Open Savings Account',
    'btn.apply_loan': 'Apply for Loan',
    'btn.make_contribution': 'Make Contribution',
    'btn.contact_us': 'Contact Us',

    // About Section
    'about.title': 'About Us',
    'about.history_title': 'Our Branch History',
    'about.history_text': 'The Adama Branch has faithfully served farmers, micro-merchants, and local businesses in the Adama area for years. Our foundation is drawn from collective support of our citizens to ensure reliable, tech-enabled microfinance.',
    'about.vision_title': 'Our Vision',
    'about.vision_text': 'To be the leading, highly accessible financial partner in Oromia, empowering households and unlocking local economic potential for poverty-free prosperity.',
    'about.mission_title': 'Our Mission',
    'about.mission_text': 'To provide inclusive, transparent financial remedies rooted in the Oromo "Busaa Gonofaa" system of traditional mutual aid, backed by reliable modern technology.',

    // Stats
    'stats.members': 'Active Members',
    'stats.loans': 'Loans Issued (ETB)',
    'stats.savings': 'Savings Accounts',
    'stats.projects': 'Community Projects',

    // Supporting Campaigns
    'campaigns.title': 'Community Support Campaigns',
    'campaigns.subtitle': 'Join dynamic fund-raising drives to support emergency needs, education, and development in the Adama community.',
    'campaigns.target': 'Target',
    'campaigns.raised': 'Raised',
    'campaigns.donate_btn': 'Donate Now',
    'campaigns.no_campaigns': 'No active community support campaigns at this time.',

    // News
    'news.title': 'Latest News & Financial Advice',
    'news.subtitle': 'Stay informed with branch announcements, digital training updates, and insights on microfinance.',
    'news.read_more': 'Read Full Article',

    // Services
    'services.title': 'Our Specialized Financial Products',
    'services.subtitle': 'Crafted with premium flexibility to serve local agricultural schemes, small tradesmen, and household developments.',
    'services.savings_title': 'Savings Products',
    'services.loans_title': 'Loan Products',
    'services.insurance_title': 'Protection & Insurance',
    'services.eligibility': 'Client Eligibility',
    'services.requirements': 'General Requirements',
    'services.benefits': 'Key Benefits & Advantages',
    'services.apply_now': 'Apply Now',

    // Community & Media
    'community.title': 'Community & Media',
    'community.events_title': 'Upcoming Meetings & Trainings',
    'community.gallery_title': 'Event & Assembly Gallery',
    'community.gallery_all': 'All Media',
    'community.gallery_photos': 'Photos',
    'community.gallery_videos': 'Videos',
    'community.gallery_events': 'Branch Events',

    // Contribution Portal
    'contrib.portal_title': 'Digital Contributions Portal',
    'contrib.subtitle': 'Support development projects, environmental initiatives, and mutual welfare funds around Adama instantly.',
    'contrib.form_header': 'Submit Your Contribution',
    'contrib.name': 'Full Name',
    'contrib.email': 'Email Address',
    'contrib.phone': 'Phone Number',
    'contrib.amount': 'Contribution Amount (ETB)',
    'contrib.purpose': 'Contribution Purpose',
    'contrib.payment_method': 'Payment Mode',
    'contrib.submit': 'Process Contribution',
    'contrib.success_msg': 'Thank you! Your contribution has been registered successfully.',
    'contrib.recent': 'Recent Public Donations',
    'contrib.dashboard_total': 'Total Contributed',
    'contrib.dashboard_campaigns': 'Supported Campaigns',
    'contrib.dashboard_donors': 'Unique Donors',

    // Contact Us
    'contact.title': 'Contact Our Branch Offices',
    'contact.subtitle': 'Got questions, proposals, or looking for a counseling session? Send us a message or visit our branch offices.',
    'contact.address_label': 'Head Office Address',
    'contact.phone_label': 'Official Phone Line',
    'contact.email_label': 'Official Email Address',
    'contact.hours_label': 'Working Hours',
    'contact.form_title': 'Send Direct Message',
    'contact.name_input': 'Your full name',
    'contact.email_input': 'Your email address',
    'contact.subject_input': 'Message subject',
    'contact.message_input': 'Write your message details',
    'contact.send_btn': 'Submit Message',
    'contact.map_title': 'Interactive Map of Adama BGO Offices',

    // Admin
    'admin.title': 'CMS Management Panel',
    'admin.subtitle': 'Manage all published announcements, community events, received contributions, and customer messages.',
    'admin.add_news': 'Create News Article',
    'admin.add_event': 'Schedule New Event',
    'admin.news_list': 'Active News Catalog',
    'admin.event_list': 'Active Event Calendar',
    'admin.messages': 'Contact Submissions',
    'admin.donations': 'Donation Ledger',
    'admin.reports': 'Analytics & Reports',
  }
};
