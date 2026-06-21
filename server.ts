import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'db.json');

app.use(express.json());

// In-memory / JSON file database definitions
interface DbSchema {
  campaigns: any[];
  news: any[];
  events: any[];
  contributions: any[];
  messages: any[];
}

const defaultDb: DbSchema = {
  campaigns: [
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
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    }
  ],
  news: [
    {
      id: 'news-1',
      title_om: 'BGO Damee Adaamaa Baajata Haaraaf Qophii Gochaa Jira',
      title_am: 'የBGO አዳማ ቅርንጫፍ ለአዲሱ በጀት አመት ዝግጅቱን አጠናቀቀ',
      title_en: 'BGO Adama Closes Annual Term with Record Low Defaults',
      content_om: 'Koreen hojii raawwachiiftu BGO Damee Adaamaa gabaasa baajata waggaa dhiheessun miseensota maamiltoota qusannoo guddisanii fi liqi dhalata hin qabne dhiheessuf hojii jabaa hojjechaa jiraachuu beeksise. Liqi deebi’uu qabu keessaa %98 guutummaatti deebi’eera.',
      content_am: 'የቡሳ ጎኖፋ አዳማ ቅርንጫፍ በበጀት ዓመቱ መጨረሻ ላይ እጅግ አበረታች ውጤት ማግኘቱን አስታወቀ። ከአባላት የተበተነው ብድር 98% ያህል በሰዓቱ የተመለሰ ሲሆን ይህም ለአካባቢው ኢኮኖሚ ትልቅ መነቃቃትን ፈጥሯል።',
      content_en: 'Through robust community oversight and peer guarantee circles, the Adama Branch registered an outstanding 98% loan repayment rate. Director Aadde Obsee announced new agricultural packages scheduled for the upcoming planting season.',
      date: '2026-06-15',
      category: 'announcement',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
    }
  ],
  events: [
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
      location_en: 'Adama Geda Hall Main Stage'
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
      location_en: 'BGO Adama Meeting Hall, 2nd Floor'
    }
  ],
  contributions: [
    {
      id: 'cont-1',
      fullName: 'Obbo Chala Kenene',
      email: 'chala@oromo.net',
      phone: '+251 912 34 5678',
      amount: 1500,
      purpose: 'camp-1',
      paymentMethod: 'telebirr',
      date: '2026-06-18T10:30:00.000Z',
      status: 'completed'
    },
    {
      id: 'cont-2',
      fullName: 'W/ro Selamawit Gizaw',
      email: 'selam@cbebirr.et',
      phone: '+251 911 88 9900',
      amount: 3000,
      purpose: 'camp-2',
      paymentMethod: 'cbe_birr',
      date: '2026-06-19T14:45:00.000Z',
      status: 'completed'
    }
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Girma Tola',
      email: 'girma@gmail.com',
      subject: 'Inquiry on Women Micro Loans',
      message: 'Greetings, our cooperative in Adama town is trying to understand if there is a training certificate required for the Siiqqee joint-liability loans. Please guide us on the exact requirements.',
      date: '2026-06-17T09:15:00.000Z',
      status: 'unread'
    }
  ]
};

// Help load / save database synchronously to avoid lock issues
function readDb(): DbSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
      return defaultDb;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading database file:', error);
    return defaultDb;
  }
}

function writeDb(data: DbSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// -------------------------------------------------------------
// Back-End CMS and Operational APIs
// -------------------------------------------------------------

// News Routes
app.get('/api/news', (req, res) => {
  const db = readDb();
  res.json(db.news);
});

app.post('/api/news', (req, res) => {
  const db = readDb();
  const newItem = {
    id: `news-${Date.now()}`,
    title_om: req.body.title_om || '',
    title_am: req.body.title_am || '',
    title_en: req.body.title_en || '',
    content_om: req.body.content_om || '',
    content_am: req.body.content_am || '',
    content_en: req.body.content_en || '',
    date: new Date().toISOString().split('T')[0],
    category: req.body.category || 'announcement',
    image: req.body.image || ''
  };
  db.news.unshift(newItem);
  writeDb(db);
  res.status(201).json(newItem);
});

app.delete('/api/news/:id', (req, res) => {
  const db = readDb();
  db.news = db.news.filter(n => n.id !== req.params.id);
  writeDb(db);
  res.status(200).json({ success: true });
});

// Events Routes
app.get('/api/events', (req, res) => {
  const db = readDb();
  res.json(db.events);
});

app.post('/api/events', (req, res) => {
  const db = readDb();
  const newEvent = {
    id: `event-${Date.now()}`,
    title_om: req.body.title_om || '',
    title_am: req.body.title_am || '',
    title_en: req.body.title_en || '',
    description_om: req.body.description_om || '',
    description_am: req.body.description_am || '',
    description_en: req.body.description_en || '',
    date: req.body.date || new Date().toISOString().split('T')[0],
    time: req.body.time || '09:00 AM - 05:00 PM',
    location_om: req.body.location_om || '',
    location_am: req.body.location_am || '',
    location_en: req.body.location_en || '',
    category: req.body.category || 'meeting'
  };
  db.events.unshift(newEvent);
  writeDb(db);
  res.status(201).json(newEvent);
});

app.delete('/api/events/:id', (req, res) => {
  const db = readDb();
  db.events = db.events.filter(e => e.id !== req.params.id);
  writeDb(db);
  res.status(200).json({ success: true });
});

// Campaigns Routes
app.get('/api/campaigns', (req, res) => {
  const db = readDb();
  res.json(db.campaigns);
});

// Contributions Portal Routes
app.get('/api/contributions', (req, res) => {
  const db = readDb();
  res.json(db.contributions);
});

app.post('/api/contributions', (req, res) => {
  const db = readDb();
  const { fullName, email, phone, amount, purpose, paymentMethod } = req.body;

  if (!fullName || !amount || !paymentMethod) {
    return res.status(400).json({ error: 'Please enter name, amount, and payment method.' });
  }

  const numAmount = Number(amount);
  const newCont = {
    id: `cont-${Date.now()}`,
    fullName,
    email: email || '',
    phone: phone || '',
    amount: numAmount,
    purpose: purpose || 'General Care Fund',
    paymentMethod,
    date: new Date().toISOString(),
    status: 'completed'
  };

  db.contributions.unshift(newCont);

  // If the purpose is a campaign ID, automatically update raised amount
  const campaign = db.campaigns.find(c => c.id === purpose);
  if (campaign) {
    campaign.currentAmount = Number(campaign.currentAmount) + numAmount;
  }

  writeDb(db);
  res.status(201).json(newCont);
});

// Contact Us Routes
app.get('/api/messages', (req, res) => {
  const db = readDb();
  res.json(db.messages);
});

app.post('/api/messages', (req, res) => {
  const db = readDb();
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please enter name, email, and message.' });
  }

  const newMsg = {
    id: `msg-${Date.now()}`,
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    date: new Date().toISOString(),
    status: 'unread'
  };

  db.messages.unshift(newMsg);
  writeDb(db);
  res.status(201).json(newMsg);
});

app.post('/api/messages/:id/read', (req, res) => {
  const db = readDb();
  const msg = db.messages.find(m => m.id === req.params.id);
  if (msg) {
    msg.status = 'read';
    writeDb(db);
    return res.json(msg);
  }
  res.status(404).json({ error: 'Message not found' });
});

app.delete('/api/messages/:id', (req, res) => {
  const db = readDb();
  db.messages = db.messages.filter(m => m.id !== req.params.id);
  writeDb(db);
  res.status(200).json({ success: true });
});

// Analytics Dashboard consolidated report
app.get('/api/analytics', (req, res) => {
  const db = readDb();
  const totalContributed = db.contributions.reduce((acc, c) => acc + c.amount, 0);
  const activeCampaigns = db.campaigns.length;
  const totalDonors = new Set(db.contributions.map(c => c.fullName)).size;
  const totalContacts = db.messages.length;
  const unreadContacts = db.messages.filter(m => m.status === 'unread').length;

  res.json({
    totalContributed,
    activeCampaigns,
    totalDonors,
    totalContacts,
    unreadContacts,
  });
});

// -------------------------------------------------------------
// Vite Dev Mode vs. Compiled Production Serve Setup
// -------------------------------------------------------------

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted for local development.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BGO Branch Digital Server matches on running at http://localhost:${PORT}`);
  });
}

start();
