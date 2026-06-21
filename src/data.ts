import { NewsItem, CommunityEvent, Campaign, ServiceProduct } from './types';

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    title_om: 'Duula Deeggarsa Abbaa Warshaa Of-Danda’oo',
    title_am: 'የአነስተኛ ግብርና አርሶ አደሮች የዘር ማስፋፊያ ድጋፍ',
    title_en: 'Smallholders Crop Diversification & Seeds Relief',
    description_om: 'Q qonaan bultoota Adaamaafi naannawa ishee sanyii filatamaafi xaa’oo argachuu dadhaban bira gahuuf duula gargaarsa maallaqaa walitti qabamu.',
    description_am: 'በአዳማ ዙሪያ ላሉ አነስተኛ አርሶ አደሮች ጥራት ያለው ምርጥ ዘር እና ማዳበሪያ አቅርቦት ለመደገፍ የተጀመረ የልማት ፕሮጀክት።',
    description_en: 'Supporting smallholder farmers in rural Adama through community-funded high-yield seeds and irrigation tools to secure food storage.',
    targetAmount: 350000,
    currentAmount: 182300,
    endDate: '2026-08-31',
    category: 'agricultural',
    image: ''
  },
  {
    id: 'camp-2',
    title_om: 'Maallaqa Simannaa Qophii Gabaa Dubartootaa',
    title_am: 'የአዳማ ሴት ስራ ፈጣሪዎች የጋራ መዋጮ ፈንድ',
    title_en: 'Adama Micro-Retailers Women Empowerment Drive',
    description_om: 'Gargaarsa liqii jalqabaa dubartoota suuqii daldala xixiqqoomaniif mijeessuu fi gahoomsuuf muummee dursa gargaarsa "Busaa Gonofaa".',
    description_am: 'በአዳማ ከተማ ውስጥ ባጃጅና አነስተኛ ሱቅ ለሚያስተዳድሩ እህቶቻችን መነሻ ካፒታል የሚሆን የጋራ መዋጮ ፈንድ ማሰባሰቢያ።',
    description_en: 'Encouraging collateral-free micro-loans for market-stall mothers who form mutual guarantee circles under the Gadaa traditional systems.',
    targetAmount: 500000,
    currentAmount: 295000,
    endDate: '2026-07-25',
    category: 'development',
    image: ''
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title_om: 'BGO Damee Adaamaa Baajata Haaraaf Qophii Gochaa Jira',
    title_am: 'የBGO አዳማ ቅርንጫፍ ለአዲሱ በጀት አመት ዝግጅቱን አጠናቀቀ',
    title_en: 'BGO Adama Closes Annual Term with Record Low Defaults',
    content_om: 'Koreen hojii raawwachiiftu BGO Damee Adaamaa gabaasa baajata waggaa dhiheessun miseensota maamiltoota qusannoo guddisanii fi liqi dhalata hin qabne dhiheessuf hojii jabaa hojjechaa jiraachuu beeksise. Liqi deebi’uu qabu keessaa %98 guutummaatti deebi’eera.',
    content_am: 'የಬುሳ ጎኖፋ አዳማ ቅርንጫፍ በበጀት ዓመቱ መጨረሻ ላይ እጅግ አበረታች ውጤት ማግኘቱን አስታወቀ። ከአባላት የተበተነው ብድር 98% ያህል በሰዓቱ የተመለሰ ሲሆን ይህም ለአካባቢው ኢኮኖሚ ትልቅ መነቃቃትን ፈጥሯል።',
    content_en: 'Through robust community oversight and peer guarantee circles, the Adama Branch registered an outstanding 98% loan repayment rate. Director Aadde Obsee announced new agricultural packages scheduled for the upcoming planting season.',
    date: '2026-06-15',
    category: 'announcement',
    image: ''
  },
  {
    id: 'news-2',
    title_om: 'Barumsa Dijitaalaa Maallaqa Qusannoo Dargaggootaaf',
    title_am: 'ለወጣቶች የተዘጋጀ የፋይናንስና ዲጂታል ቁጠባ ስልጠና',
    title_en: 'Digital Savings Literacy Enrolls 500+ Adama Youth',
    content_om: 'Waliigaltee yuunivarsitii ASTU wajjin taasifameen, dargaggootni herrega qusannoo bilbilaan banatan kaappitaala jalqabaa argatanii barumsa bu’uura daldalaa argatanii jiru.',
    content_am: 'ከአዳማ ሳይንስና ቴክኖሎጂ ዩኒቨርሲቲ ጋር በመተባበር ወጣቶች በዲጂታል አማራጮች እንዴት መቆጠብና ተያያዥ አነስተኛ ቢዝነስ መጀመር እንደሚችሉ የተሳካ ስልጠና ተሰጥቷል።',
    content_en: 'In collaboration with ASTU, our Youth Incubator Division provided hands-on training to over 500 graduates on microfinance applications, business planning, and mobile banking protocols.',
    date: '2026-06-10',
    category: 'education',
    image: ''
  },
  {
    id: 'news-3',
    title_om: 'Diriira Inshuraansii Misooma Midhaanii Naannoo Adaamaatti',
    title_am: 'የመኸር ሰብል አደጋ መድን ለገበሬዎች ተሰራጨ',
    title_en: 'Weather Index Crop Insurance Safeguards 1200 Farmers',
    content_om: 'Sababa jidduu-galeessa jijjiirama kurraa qabeenyaa, q qonnaan bultoota keenya rooba dhabuu irra gargaaraa Inshuraansii haala giddugaleessa dhiheessinee jirra.',
    content_am: 'በአየር ንብረት መዛባት ምክንያት በሰብል ላይ የሚደርሰውን ጉዳት ለመቀነስ የተዘጋጀው የሰብል አደጋ መድን አገልግሎት ከዘንድሮው አዝመራ ጀምሮ ሙሉ በሙሉ ተግባራዊ ሆኗል።',
    content_en: 'Adama branch has rolled out the dynamic Weather-Indexed Micro-insurance cover, directly shielding tomato and onion smallholders against seasonal rain failure.',
    date: '2026-06-01',
    category: 'update',
    image: ''
  }
];

export const initialEvents: CommunityEvent[] = [
  {
    id: 'event-1',
    title_om: 'Walgahii Waggaa Fi Tokkummaa Busaa Gonofaa',
    title_am: 'የዓመታዊ አባላት ጠቅላላ ጉባኤና በዓል',
    title_en: 'Annual General Assembly & Cultural Celebration',
    description_om: 'I miseensota dhiyootti gumaachan, abbootii Gadaafi maamiloota Adaamaa hundaaf gabaasa baajatawaggaa fi dhimma badhaasaa ilaalchisee mariidha.',
    description_am: 'የአመቱ ጠቅላላ ሒሳብ ሪፖርት የሚቀርብበትና ምርጥ ቆጣቢ ገበሬዎችና የንግድ ሴቶች የሚሸለሙበት ታላቅ የማህበረሰብ ዝግጅት።',
    description_en: 'Join us at the Adama Geda Hall for our annual branch accountability audit, dividend announcements, and Gadaa traditional blessings.',
    date: '2026-07-12',
    time: '09:00 AM - 04:30 PM',
    location_om: 'Galma Gadaa Adaamaa (Geda Hall)',
    location_am: 'አዳማ ገዳ አዳራሽ (ዋናው አዳራሽ)',
    location_en: 'Adama Geda Hall Main Stage',
    category: 'celebration'
  },
  {
    id: 'event-2',
    title_om: 'Leenjii Daldala Xixiqqaafi Dubartoota Gadaa',
    title_am: 'የአነስተኛ ቢዝነስ አመራርና ቁጠባ ስልጠና ለሴቶች',
    title_en: 'Micro-Enterprise Management & Financial Literacy Workshop',
    description_om: 'Barumsa madaa maallaqaa, herrega bulchuu fi beekumsa gabaa dijitaalaa daldaltoota xixiqqoo dubartootaa Adaamaatiif.',
    description_am: 'አነስተኛ ንግድ እንዴት በጥራት እንደሚመራ፣ ወጪና ገቢን እንዴት ማመጣጠን እንደሚቻል ለጀማሪ ሴት ስራ ፈጣሪዎች የሚሰጥ ተግባራዊ ስልጠና።',
    description_en: 'A highly structured boot camp to equip female cooperative leaders with modern ledger skills, digital payment integrations, and marketing tools.',
    date: '2026-06-28',
    time: '02:00 PM - 05:00 PM',
    location_om: 'Wirtuu Leenjii BGO, Damee Adaamaa Annex',
    location_am: 'በቡሳ ጎኖፋ አዳማ የስብሰባ አዳራሽ',
    location_en: 'BGO Adama Meeting Hall, 2nd Floor',
    category: 'training'
  }
];

export const staticProducts: ServiceProduct[] = [
  {
    id: 'prod-1',
    type: 'savings',
    name_en: 'Regular Community Savings (Welfare Accord)',
    name_om: 'Qusannoo Idilee Hawaasummaa (Welfare Accord)',
    name_am: 'መደበኛ የማህበረሰብ ቁጠባ (ዌልፌር አኮርድ)',
    description_en: 'The traditional foundation of Busaa Gonofaa adapted to modern banking. Highly stable savings generating competitive interest to cover family affairs.',
    description_om: 'Bu’uura qusannoo aadaa Busaa Gonofaa beekamtii argatee fi dhalata gaarii dhabeessa ta’een maatii keessan deeggaruuf.',
    description_am: 'የባህላዊው ቡሳ ጎኖፋ የጋራ መረዳጃ እሴቶችን ከዘመናዊ ባንክ አሰራር ጋር ያቀናጀ። የተረጋጋ ወለድ የሚከፈልበትና አባላትን ዋስትና የሚያደርግ።',
    eligibility_en: 'Any Adama resident aged 18+ who participates in local mutual aid structures (Iddir).',
    eligibility_om: 'Jiraattota Adaamaa kamiyyuu ganna 18 oliifi miseensa Iddir aadaa ta’an.',
    eligibility_am: 'በአዳማ ከተማ ውስጥ ነዋሪ የሆነ ዕድሜው 18 እና ከዚያ በላይ የሆና፣ የአካባቢው እድር አባል የሆነ ግለሰብ።',
    requirements_en: 'Valid Kebele ID or Passport, 2 passport-sized photographs, minimum opening deposit of 100 ETB.',
    requirements_om: 'Waraqaa eenyummaa gandaa, suuraa lama, herrega banuuf herrega xiqqaa 100 ETB.',
    requirements_am: 'የታደሰ የነዋሪነት መታወቂያ፣ 2 የፎቶግራፍ ምስሎች፣ ዝቅተኛ መክፈቻ ተቀማጭ የ100 ብር መዋጮ።',
    benefits_en: 'Annual interest yields, zero monthly administrative maintenance fees, unlocks low-rate loan eligibility after 3 months of consistent saving.',
    benefits_om: 'Dhala waggaa mijaawaa, kaffaltii tajaajila ji’aa kan hinturre, qusannoo ji’a 3 booda liqi mijeessa.',
    benefits_am: 'አስተማማኝ አመታዊ ወለድ፣ ምንም አይነት ወርሃዊ የሂሳብ ማስጠበቂያ ክፍያ የሌለው፣ ከ3 ወር ተከታታይ ቁጠባ በኋላ ዝቅተኛ ወለድ ያለው ብድር ያስገኛል።'
  },
  {
    id: 'prod-2',
    type: 'savings',
    name_en: 'Gadaa Youth & Education Pioneer',
    name_om: 'Qusannoo Dargaggoo Gadaa',
    name_am: 'የገዳ ወጣቶችና ትምህርት ቁጠባ',
    description_en: 'High-yield school and vocational start-up savings with integrated tech micro-rewards and digital portal dashboard support.',
    description_om: 'Barnoota sadarkaa olaanaaf, leenjii harkaafi daldala haaraaf dargaggoota Adaamaa maallaqa qusachuuf jabeessu.',
    description_am: 'ለወጣቶች ከፍተኛ ትምህርትና አዳዲስ የንግድ ስራ ሃሳቦች መነሻ እንዲሆን የተነደፈ፣ በዲጂታል የባንክ አገልግሎት የታገዘ የቁጠባ አይነት።',
    eligibility_en: 'Adama youths, vocational graduates, and students aged 15-29.',
    eligibility_om: 'Dargaggoota Adaamaa, barattoota fi hojii dhabeeyyii ganna 15-29 jidduu jiran.',
    eligibility_am: 'የአዳማ ከተማ ወጣቶች፣ የኮሌጅ ተማሪዎችና ስራ ፈላጊዎች ዕድሜያቸው ከ15 እስከ 29 የሆኑ።',
    requirements_en: 'Student ID or Kebele certification, parent co-signing if under 18, 50 ETB initial deposit.',
    requirements_om: 'Waraqaa eenyummaa barataa, gargaarsa maatii (umriin 18 gadi yoo ta’e), kaffatama jalqabaa 50 ETB.',
    requirements_am: 'የተማሪ መታወቂያ ወይም የነዋሪነት ማረጋጊያ፣ ከአሳዳጊ ሙሉ ፈቃድና ዝቅተኛ መነሻ የ50 ብር ተቀማጭ።',
    benefits_en: 'Highest interest margin, free access to BGO digital financial training workshops, direct matching startup grants up to 5,000 ETB.',
    benefits_om: 'Dhala qusannoo olaanaa, leenjii bulchiinsa daldalaa tola argachuu, badhaasa kaappitaalaa hanga 5000 ETB.',
    benefits_am: 'ከፍተኛ የወለድ ተመኖች፣ በስልጠና ማዕከሎቻችን በነጻ መሳተፍ፣ ምርጥ ሃሳብ ላላቸው እስከ 5000 ብር የሚደርስ ተጨማሪ ድጋፍ ማግኘት።'
  },
  {
    id: 'prod-3',
    type: 'loans',
    name_en: 'Oda Agricultural Agro-Input Loan',
    name_om: 'Liqii Oda Qonnaa & Xaa’oo',
    name_am: 'የኦዳ ግብርና ግብዓት ብድር',
    description_en: 'Dynamic credit facilitating immediate procurement of fertilizers, certified high-yield tomato seeds, and minor machinery for Adama clusters.',
    description_om: 'Q qonnaan bultootaaf xaa’oo, sanyii mijeessuu, fi meeshaalee qonnaa xixiqqoo bituuf liqi rooba irratti hunaa’e.',
    description_am: 'ለአዳማ ገበሬዎች የዘር ማሻሻያ፣ ማዳበሪያና አነስተኛ የግብርና መገልገያ መኪናዎችንና ቁሳቁሶችን በፍጥነት ለመግዛት የሚረዳ የብድር አይነት።',
    eligibility_en: 'Certified farmers registered inside the East Shewa Cooperative Union, with farming land within 30km radius of Adama.',
    eligibility_om: 'Q qonnaan bultoota gamta q qonnaan bultoota Baha Shawaatti galmaawun, qabeenya dhihoo qaban.',
    eligibility_am: 'በምስራቅ ሸዋ የግብርና ህብረት ስር የተመዘገቡና አዳማ ዙሪያ የይዞታ መሬት ያላቸው ገበሬዎች።',
    requirements_en: 'Land ownership deed or lease agreement, local cooperative union recommendation letter, joint guarantor signatures from two neighbor farmers.',
    requirements_om: 'Ragaa lafa qonnaa, xalayaa gargaarsa gamtaa q qonnaan bultootaa, mallattoo wabii namoota lama.',
    requirements_am: 'የመሬት ይዞታ ማረጋገጫ ደብተር፣ የገበሬዎች ማህበር የድጋፍ ደብዳቤ፣ የሁለት አካባቢ ገበሬዎች የጋራ ዋስትና ፊርማ።',
    benefits_en: 'Flexible dynamic repayment structured post-harvest, lowest interest margin, expert soil counseling visits from field representatives.',
    benefits_om: 'Kaffaltii maallaqaa yeroo midhaanii boodatti mijeessuu, dhalata xiqqaa, faayida gorsa dachee.',
    benefits_am: 'ምርት በተሰበሰበበት ወቅት የሚከፈል ተለዋዋጭ የክፍያ ጊዜ፣ በጣም ዝቅተኛ ወለድ፣ የግብርና ባለሙያዎች ነጻ ሙያዊ ምክር።'
  },
  {
    id: 'prod-4',
    type: 'loans',
    name_en: 'Siiqqee Women Joint-Liability Loan',
    name_om: 'Liqii Dubartoota Siiqqee',
    name_am: 'የሲቄ የሴቶች የጋራ ዋስትና ብድር',
    description_en: 'Collateral-free credit tailored specifically for female cooperative circles who form joint guarantee groups to launch small retail networks.',
    description_om: 'Dubartoota hojii xixiqqoo daldalaa irratti hirmaataniif wabii malee gareen wal-tumsuun liqii kennamu haala seera aadaa Siiqqeetiin.',
    description_am: 'ሴት ስራ ፈጣሪዎችን ለማበረታታትና ያለ መያዣ መነገጃ እንዲሆናቸው የተዘጋጀ፣ በጋራ የዋስትና እሴቶች የሚሰጥ ልዩ የብድር አገልግሎት።',
    eligibility_en: 'Self-organized women peer groups of 5 members residing in the Adama township.',
    eligibility_om: 'Garee dubartoota namoota 5 of-danda’an fi magaalaa Adaamaa qubatan.',
    eligibility_am: 'በአዳማ ከተማ ውስጥ የሚኖሩ ራሳቸውን ያደራጁ የ5 ሴቶች የጋራ ቡድኖች።',
    requirements_en: 'Joint application letter of group intention, valid township residence card, short operational business concept summary.',
    requirements_om: 'Xalayaa garee, waraqaa eenyummaa gandaa, gabaasa gabaabaa kaayyoo daldalaa.',
    requirements_am: 'የጋራ የቡድን የውል ስምምነት ሰነድ፣ የከተማ መታወቂያ፣ የአነስተኛ ንግድ እቅድ መግለጫ።',
    benefits_en: 'Absolutely collateral-free, 100% group counseling, priority access to BGO Trade Exhibit booths in central Adama.',
    benefits_om: 'Wabii qabeenyaa tokko malee, gorsa fi dhiyeessa booth daldalaa kan BGO gosa dursa argachuu.',
    benefits_am: 'ያለ ምንም የመያዣ ዋስትና የሚሰጥ፣ የኢንተርፕራይዝ ቢዝነስ ስልጠናዎችን በነፃ የሚያካትት።'
  },
  {
    id: 'prod-5',
    type: 'insurance',
    name_en: 'Oromia Weather-Index Agricultural Insurance',
    name_om: 'Inshuraansii Haala Kurraa Midhaanii',
    name_am: 'የገበሬዎች የአየር ሁኔታ አዝመራ መድን (ኢንሹራንስ)',
    description_en: 'Innovative climate-proof insurance which auto-triggers compensations when cumulative rainfall falls below strict meteorological parameters.',
    description_om: 'Midhaanni sababa rooba dhabuu ykn lolaan yoo miidhame faayinaansii kaffaltii ariifachiisaa mijeessuun qonnaan bulaa eega.',
    description_am: 'በአየር ንብረት መዛባትና በድርቅ ምክንያት ሰብላቸው ለተጎዳ ገበሬዎች የገንዘብ ካሳ የሚከፍል ዘመናዊ የመደን ዋስትና።',
    eligibility_en: 'Open to both registered agricultural borrowers and non-borrowing local farmers alike.',
    eligibility_om: 'Q qonnaan bultoota BGO irraa liqeeffatanis ta’ee kan ofiin qonan hundaaf banaadha.',
    eligibility_am: 'ከBGO ተቋም የተበደሩ እንዲሁም ሌሎች በአዳማ ዙሪያ የሚገኙ ገበሬዎች በሙሉ መመዝገብ ይችላሉ።',
    requirements_en: 'Completed application specifying farm boundary, estimated crop coverage, payment of dynamic low premium per season.',
    requirements_om: 'Galmeessa lafaa, xiixama gosa midhaanii, fi kaffaltii xiqqaa premium waggaa.',
    requirements_am: 'የሰብል ይዞታ ምዝገባ ማመልከቻ፣ የተተከለው የሰብል አይነትና ዋጋ መግለጫ፣ አነስተኛ ወርሃዊ የመድን ክፍያ መፈጸም።',
    benefits_en: 'Automatic payout using local satellite data without tedious inspection claims, covers fertilizer capital, fully subsidized by 30% via BGO grants.',
    benefits_om: 'Kaffaltii saffasaa satalaayitiin mirkanaawu gargaarsan bulchiinsi %30 deeggarama.',
    benefits_am: 'የሳተላይት መረጃን መሰረት በማድረግ ምርቱ ለደረሰበት አደጋ ያለ ምንም የተንዛዛ ሰነድ ፈጣን ካሳ መክፈል።'
  }
];
