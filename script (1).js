// TRL Service Engine - Marketplace Logic
const services = [
  // AI Content Creation $5-$50
  {id:1, cat:'ai-content', title:'Social Media Captions', desc:'Viral captions for IG, LinkedIn, TikTok. 10 captions + hashtags.', price:'$5', time:'24h', tags:['Viral','Hashtags']},
  {id:2, cat:'ai-content', title:'Blog Writing', desc:'SEO blog post 800-1200 words, research + images suggestions.', price:'$15', time:'48h', tags:['SEO','Research']},
  {id:3, cat:'ai-content', title:'Product Descriptions', desc:'10 high-converting product descriptions for ecom.', price:'$10', time:'24h', tags:['Ecom','Convert']},
  {id:4, cat:'ai-content', title:'Viral Script Writing', desc:'Reel/TikTok scripts that hook in 3 seconds, 5 scripts.', price:'$12', time:'24h', tags:['Hook','Viral']},
  // AI Business Tools $20-$100
  {id:5, cat:'ai-business', title:'Business Idea Generator', desc:'10 validated business ideas based on your skills + market analysis.', price:'$20', time:'48h', tags:['Validation','Market']},
  {id:6, cat:'ai-business', title:'Market Research Report', desc:'Competitor, pricing, demand analysis for your niche. 10-page PDF.', price:'$35', time:'3 days', tags:['Competitor','Demand']},
  {id:7, cat:'ai-business', title:'Business Plan', desc:'Investor-ready business plan: problem, solution, market, financials.', price:'$80', time:'5 days', tags:['Investor','Financials']},
  {id:8, cat:'ai-business', title:'Strategy Document', desc:'Go-to-market strategy: channels, pricing, launch plan. Custom to you.', price:'$60', time:'3 days', tags:['GTM','Launch']},
  // AI Design $5-$50
  {id:9, cat:'ai-design', title:'AI Logo Design', desc:'3 premium logo concepts, black + electric blue minimal, SVG + PNG.', price:'$15', time:'24h', tags:['Minimal','SVG'], featured:true},
  {id:10, cat:'ai-design', title:'Poster / Flyer Design', desc:'Premium poster for event, product, social. Print + digital.', price:'$10', time:'24h', tags:['Print','Social']},
  {id:11, cat:'ai-design', title:'Social Media Designs', desc:'10 Instagram posts/stories, premium black aesthetic.', price:'$20', time:'48h', tags:['IG','Premium']},
  {id:12, cat:'ai-design', title:'Brand Kit', desc:'Logo + colors + fonts + guidelines + business card. Complete brand.', price:'$45', time:'3 days', tags:['Brand','Kit'], featured:true},
  // AI Automation $50-$200
  {id:13, cat:'automation', title:'WhatsApp Automation', desc:'Auto reply, lead capture, follow-up sequences. n8n setup.', price:'$75', time:'3 days', tags:['n8n','Leads']},
  {id:14, cat:'automation', title:'Email System', desc:'Cold email + follow-up automation, tracking, CRM integration.', price:'$60', time:'2 days', tags:['Cold Email','CRM']},
  {id:15, cat:'automation', title:'Workflow Setup', desc:'Automate one manual workflow: lead → CRM → notification → sheet.', price:'$50', time:'2 days', tags:['Workflow','Save 5hrs']},
  {id:16, cat:'automation', title:'AI Assistant Setup', desc:'Custom AI assistant trained on YOUR docs (RAG), website embed.', price:'$150', time:'5 days', tags:['RAG','Support'], featured:true},
  // Personal Growth $10-$50
  {id:17, cat:'growth', title:'Learning Plan', desc:'30-day personalized learning roadmap for your goal. Applied, not theory.', price:'$15', time:'48h', tags:['Roadmap','Applied']},
  {id:18, cat:'growth', title:'Career Roadmap', desc:'6-month career plan: skills, projects, positions, salary growth.', price:'$25', time:'3 days', tags:['Career','Salary']},
  {id:19, cat:'growth', title:'Productivity System', desc:'Notion/TRL OS setup: goals, habits, tasks, knowledge base.', price:'$30', time:'2 days', tags:['Notion','OS']},
  // Business Documents $10-$100
  {id:20, cat:'documents', title:'Company Profile', desc:'Premium 8-page company profile PDF, black + blue, investor-ready.', price:'$40', time:'3 days', tags:['Premium','PDF'], featured:true},
  {id:21, cat:'documents', title:'Presentation Deck', desc:'10-slide pitch deck, Apple-level design, story + numbers.', price:'$35', time:'2 days', tags:['Pitch','Investor']},
  {id:22, cat:'documents', title:'Proposal Template', desc:'Black premium proposal that closes: problem, ROI, investment, next steps.', price:'$25', time:'24h', tags:['Close','ROI']},
  {id:23, cat:'documents', title:'Business Templates Pack', desc:'10 templates: contract, onboarding form, KPI tracker, audit, SOPs.', price:'$30', time:'24h', tags:['Templates','SOPs']},
];

let currentFilter = 'all';
let currentSearch = '';

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  const filtered = services.filter(s => {
    const matchCat = currentFilter === 'all' || s.cat === currentFilter;
    const matchSearch = s.title.toLowerCase().includes(currentSearch.toLowerCase()) || s.desc.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });
  grid.innerHTML = filtered.map(s => `
    <div class="service-card ${s.featured ? 'featured' : ''}">
      ${s.featured ? '<div class="featured-badge">🔥 Popular</div>' : ''}
      <div class="service-card-top">
        <span class="cat-tag">${s.cat.replace('ai-','').replace('-',' ')}</span>
        <span class="price">${s.price}</span>
      </div>
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
      <div class="service-meta">
        <span class="meta">⏱ ${s.time}</span>
        ${s.tags.map(t=>`<span class="meta">${t}</span>`).join('')}
      </div>
      <button class="service-btn" onclick="openRequestModal('${s.title.replace(/'/g,"\\'")}', '${s.price}')">Get This Service →</button>
    </div>
  `).join('') || `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#666">No services found for "${currentSearch}" — Try Create Your Request button</div>`;
}

function filterCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  renderServices();
}

function filterServices() {
  const input = document.getElementById('searchInput');
  currentSearch = input.value;
  renderServices();
}

function openRequestModal(serviceName, price) {
  const modal = document.getElementById('orderModal');
  document.getElementById('modalServiceName').textContent = serviceName;
  document.getElementById('custService').value = serviceName + (price ? ` (${price})` : '');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('orderModal').classList.remove('open');
  document.body.style.overflow = '';
}

function submitOrder() {
  const name = document.getElementById('custName').value.trim();
  const wa = document.getElementById('custWhatsApp').value.trim();
  const details = document.getElementById('custDetails').value.trim();
  const deadline = document.getElementById('custDeadline').value;
  const budget = document.getElementById('custBudget').value;
  const service = document.getElementById('custService').value;

  if (!name || !wa || !details) {
    alert('Please fill Name, WhatsApp, and What you need');
    return;
  }

  const orderId = 'TRL-' + Date.now().toString().slice(-6);
  const order = {
    id: orderId,
    customer: name,
    whatsapp: wa,
    service: service,
    details: details,
    deadline: deadline,
    budget: budget,
    status: 'Payment Pending',
    date: new Date().toISOString(),
    revenue: budget
  };

  // Save to localStorage
  const orders = JSON.parse(localStorage.getItem('trl_orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('trl_orders', JSON.stringify(orders));

  // Build WhatsApp message for admin
  const adminMsg = `NEW ORDER - TRL Service Engine\n\nOrder ID: ${orderId}\nCustomer: ${name}\nWhatsApp: ${wa}\nService: ${service}\nDetails: ${details}\nDeadline: ${deadline}\nBudget: ${budget}\n\nCustomer Contact: ${wa}\n\nPlease send invoice.`;

  const adminWaLink = `https://wa.me/923190091457?text=${encodeURIComponent(adminMsg)}`;

  // Customer tracking message
  const custMsg = `Hi ${name}, your TRL order ${orderId} for ${service} is received! We will send invoice + start production. Track at TRL Engine dashboard.`;

  closeModal();
  
  // Open admin WhatsApp
  window.open(adminWaLink, '_blank');

  // Show success
  setTimeout(() => {
    alert(`✅ Order ${orderId} Created!\n\n1. WhatsApp opened to admin (Rashid 0319 0091457)\n2. Order saved in dashboard\n3. We will send invoice & start work\n\nTrack: admin.html\n\nCustomer WhatsApp ${wa} will get confirmation.`);
    // Reset form
    document.getElementById('custName').value = '';
    document.getElementById('custWhatsApp').value = '';
    document.getElementById('custDetails').value = '';
  }, 500);
}

function openAdmin() {
  window.open('admin.html', '_blank');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  // Close modal on escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  console.log('TRL Service Engine V1 loaded • 23 services • WhatsApp 0319 0091457');
});
