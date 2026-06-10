// GeneLens AI — Pathway Map Data
// World coordinate space: 1900 x 1400

const PATHWAY_REGIONS = [
  { id:'membrane',  label:'Cell Membrane\n& Receptors',  x:950,  y:120,  w:1600, h:180,  color:'#00d4ff' },
  { id:'ras_mapk',  label:'RAS / MAPK\nProliferation',   x:420,  y:520,  w:580,  h:480,  color:'#ef4444' },
  { id:'pi3k_akt',  label:'PI3K / AKT\nSurvival & Growth',x:1280, y:480,  w:560,  h:440,  color:'#f59e0b' },
  { id:'p53',       label:'p53 / Apoptosis\nCheckpoint',  x:870,  y:870,  w:480,  h:260,  color:'#3b82f6' },
  { id:'cell_cycle',label:'Cell Cycle\nControl',          x:280,  y:1080, w:480,  h:280,  color:'#8b5cf6' },
  { id:'wnt',       label:'Wnt / MYC\nStem & Growth',     x:1400, y:1050, w:480,  h:280,  color:'#10b981' },
  { id:'dna_repair',label:'DNA Repair\nGenome Stability',  x:1680, y:430,  w:380,  h:480,  color:'#f472b6' },
];

const PATHWAY_NODES = [
  // ── CELL MEMBRANE RECEPTORS ──
  { id:'PDGFR',  x:220,  y:100, r:22, color:'#f59e0b', type:'kinase',     mutRate:6,  fullName:'PDGF Receptor',                 cancers:['gbm','skcm'], drugs:['Imatinib','Sunitinib'], desc:'Receptor tyrosine kinase activated by PDGF growth factors. Drives proliferation and survival; amplified in glioblastoma. Imatinib was the first approved TKI to target PDGFR.' },
  { id:'EGFR',   x:500,  y:100, r:30, color:'#f59e0b', type:'kinase',     mutRate:18, fullName:'Epidermal Growth Factor Receptor', cancers:['luad','gbm'], drugs:['Erlotinib','Gefitinib','Osimertinib','Afatinib'], desc:'Receptor tyrosine kinase activated by EGF. Activating mutations (exon 19 del, L858R) drive ~20% of lung adenocarcinomas. Third-generation TKI Osimertinib overcomes the T790M resistance mutation. GBM shows EGFR amplification and EGFRvIII deletion mutant.' },
  { id:'HER2',   x:700,  y:100, r:28, color:'#f59e0b', type:'kinase',     mutRate:16, fullName:'HER2 / ERBB2',                    cancers:['brca','stad'], drugs:['Trastuzumab','Pertuzumab','T-DXd','Tucatinib'], desc:'HER2 is amplified in ~20% of breast cancers and ~15% of gastric cancers. It preferentially heterodimerizes with other EGFR family members. Trastuzumab (Herceptin) transformed HER2+ breast cancer outcomes. Trastuzumab deruxtecan (T-DXd) achieves responses even in HER2-low disease.' },
  { id:'MET',    x:900,  y:100, r:24, color:'#f59e0b', type:'kinase',     mutRate:6,  fullName:'MET Proto-Oncogene',              cancers:['luad','paad'], drugs:['Capmatinib','Tepotinib','Crizotinib'], desc:'Receptor tyrosine kinase for hepatocyte growth factor (HGF). MET exon 14 skipping mutations (3% NSCLC) and amplifications are actionable with capmatinib and tepotinib. Also a key bypass resistance mechanism to EGFR TKIs.' },
  { id:'VEGFR',  x:1100, y:100, r:24, color:'#f59e0b', type:'kinase',     mutRate:8,  fullName:'VEGF Receptor',                   cancers:['kirc','coad'], drugs:['Bevacizumab','Sunitinib','Sorafenib','Axitinib'], desc:'VEGFR family (VEGFR1-3) mediates vascular endothelial growth factor signaling, the master driver of tumor angiogenesis. VEGFR2 is the primary mediator of angiogenesis. Anti-VEGF/VEGFR therapy (bevacizumab, sunitinib) is central to kidney cancer and colorectal cancer treatment.' },
  { id:'ALK',    x:1300, y:100, r:24, color:'#f59e0b', type:'kinase',     mutRate:5,  fullName:'Anaplastic Lymphoma Kinase',       cancers:['luad'], drugs:['Alectinib','Brigatinib','Lorlatinib','Crizotinib'], desc:'EML4-ALK fusion (chromosomal inversion) creates a constitutively active kinase in ~5% of NSCLC. Lorlatinib (3rd-gen) overcomes resistance mutations and penetrates the CNS. ALK+ patients are typically young never-smokers with dramatically better outcomes on TKIs than chemotherapy.' },
  { id:'RET',    x:1500, y:100, r:22, color:'#f59e0b', type:'kinase',     mutRate:4,  fullName:'RET Proto-Oncogene',              cancers:['thca','luad'], drugs:['Selpercatinib','Pralsetinib'], desc:'RET fusions and point mutations drive thyroid cancers (especially medullary and papillary) and ~2% of NSCLC. Selpercatinib and pralsetinib are highly selective RET inhibitors with CNS activity, approved for RET-altered lung and thyroid cancers.' },
  { id:'FGFR',   x:1700, y:100, r:22, color:'#f59e0b', type:'kinase',     mutRate:12, fullName:'FGFR Family (1-4)',               cancers:['blca','cca'], drugs:['Erdafitinib','Pemigatinib','Infigratinib'], desc:'FGFR alterations (mutations, fusions, amplifications) drive bladder cancer (FGFR3 ~15%) and intrahepatic cholangiocarcinoma (FGFR2 fusions). Erdafitinib approved for FGFR3-altered bladder cancer. Pemigatinib for FGFR2-fused cholangiocarcinoma.' },

  // ── ADAPTERS / MEDIATORS ──
  { id:'GRB2',   x:550,  y:230, r:18, color:'#94a3b8', type:'adapter',    mutRate:2,  fullName:'Growth Factor Receptor Bound 2', cancers:[], drugs:[], desc:'Adapter protein linking activated RTKs to the RAS exchange factor SOS. GRB2 contains SH2 (binds phosphotyrosine) and SH3 (binds SOS proline-rich region) domains. Essential relay between membrane receptors and cytoplasmic RAS signaling.' },
  { id:'SOS',    x:460,  y:310, r:18, color:'#94a3b8', type:'adapter',    mutRate:1,  fullName:'Son of Sevenless (RAS-GEF)',     cancers:[], drugs:[], desc:'Guanine nucleotide exchange factor (GEF) that catalyzes exchange of GDP for GTP on RAS, activating it. Recruited to the membrane by GRB2 after RTK activation. The main physiological activator of RAS.' },
  { id:'PI3K',   x:1100, y:280, r:26, color:'#f59e0b', type:'kinase',     mutRate:22, fullName:'PI3Kα (PIK3CA)',                 cancers:['brca','coad','ucec'], drugs:['Alpelisib','Copanlisib'], desc:'PIK3CA encodes the catalytic p110α subunit of PI3Kα. Hotspot mutations (H1047R, E545K, E542K) hyperactivate the PI3K pathway. The most commonly mutated kinase in breast cancer (~35% of HR+ cases). Alpelisib approved for PIK3CA-mutant HR+/HER2- breast cancer.' },

  // ── RAS/MAPK PATHWAY ──
  { id:'NF1',    x:230,  y:370, r:24, color:'#3b82f6', type:'suppressor', mutRate:9,  fullName:'Neurofibromin 1',                cancers:['gbm','skcm','luad'], drugs:['MEK inhibitors (Trametinib)'], desc:'NF1 encodes neurofibromin, a GTPase-activating protein (GAP) that promotes RAS hydrolysis of GTP to GDP, inactivating RAS. Loss of NF1 locks RAS in its active state. Germline NF1 mutations cause neurofibromatosis type 1. Somatic NF1 mutations occur in melanoma, GBM, and NSCLC.' },
  { id:'KRAS',   x:500,  y:390, r:32, color:'#ef4444', type:'oncogene',   mutRate:28, fullName:'KRAS Proto-Oncogene',            cancers:['luad','coad','paad'], drugs:['Sotorasib (G12C)','Adagrasib (G12C)'], desc:'The most commonly mutated oncogene in human cancer. Normally cycles between GTP-bound (active) and GDP-bound (inactive) states. Oncogenic mutations (G12D, G12V, G12C) block GTPase activity, locking KRAS in the active state. KRAS G12C-specific inhibitors (sotorasib, adagrasib) were a landmark 2021 approval, ending two decades of "undruggability".' },
  { id:'BRAF',   x:500,  y:490, r:28, color:'#ef4444', type:'kinase',     mutRate:14, fullName:'B-RAF Proto-Oncogene',           cancers:['skcm','thca','coad'], drugs:['Vemurafenib','Dabrafenib','Encorafenib','Trametinib (combo)'], desc:'V600E mutation (80% of BRAF cancers) substitutes glutamic acid for valine, creating a constitutively active kinase that drives ERK signaling without upstream RAS input. Present in ~50% of melanomas, ~60% of thyroid papillary cancers. Doublet BRAF+MEK inhibition (dabrafenib+trametinib) dramatically improved melanoma outcomes.' },
  { id:'RAF1',   x:380,  y:490, r:20, color:'#ef4444', type:'kinase',     mutRate:3,  fullName:'RAF1 / C-RAF',                  cancers:['luad'], drugs:[], desc:'RAF1 (C-RAF) is a serine/threonine kinase that can paradoxically be activated by BRAF inhibitors in RAS-mutant cells (paradoxical RAF activation), driving resistance. RAF1 fusions occasionally drive NSCLC.' },
  { id:'MEK',    x:500,  y:590, r:26, color:'#ef4444', type:'kinase',     mutRate:4,  fullName:'MEK1/2 (MAP2K1/2)',             cancers:['skcm','luad'], drugs:['Trametinib','Cobimetinib','Binimetinib'], desc:'MEK1 and MEK2 are dual-specificity kinases phosphorylated by RAF. MEK1 (MAP2K1) mutations are present in ~5% of melanomas and some lung cancers. MEK inhibitors (trametinib) used in combination with BRAF inhibitors to delay resistance. MEK inhibitors alone approved for NF1-related tumors.' },
  { id:'ERK',    x:500,  y:690, r:26, color:'#ef4444', type:'kinase',     mutRate:2,  fullName:'ERK1/2 (MAPK1/3)',              cancers:['skcm','luad'], drugs:['ERK inhibitors (investigational)'], desc:'ERK1/2 are the terminal effectors of the RAS/MAPK cascade. Once phosphorylated by MEK, ERK translocates to the nucleus and phosphorylates transcription factors driving cell proliferation (ELK1, MYC, RSK). ERK inhibitors are under investigation to overcome MEK inhibitor resistance.' },
  { id:'RSK',    x:360,  y:760, r:18, color:'#ef4444', type:'kinase',     mutRate:2,  fullName:'RSK / p90RSK',                  cancers:[], drugs:[], desc:'RSK (ribosomal S6 kinase) is phosphorylated by ERK and promotes cell survival and proliferation by phosphorylating multiple downstream targets including MDM2 and BAD.' },

  // ── PI3K/AKT/mTOR ──
  { id:'PTEN',   x:950,  y:430, r:28, color:'#3b82f6', type:'suppressor', mutRate:17, fullName:'PTEN Phosphatase',               cancers:['gbm','brca','prad'], drugs:['mTOR inhibitors (Everolimus)'], desc:'PTEN dephosphorylates PIP3 back to PIP2, directly opposing PI3K. The second most commonly lost tumor suppressor after TP53. Lost via deletion, mutation, or epigenetic silencing. PTEN loss leads to constitutive AKT activation. Tumors with PTEN loss are often sensitive to PI3K/AKT/mTOR inhibitors.' },
  { id:'AKT',    x:1200, y:450, r:28, color:'#f59e0b', type:'kinase',     mutRate:6,  fullName:'AKT1/2/3 (PKB)',                 cancers:['brca','coad'], drugs:['Capivasertib','Ipatasertib'], desc:'AKT (protein kinase B) is the central node of the PI3K/AKT/mTOR pathway. Activated by PIP3 binding and PDK1 phosphorylation. Phosphorylates dozens of substrates to promote cell survival (phospho-BAD), growth (mTOR), and cell cycle (CDK2 activation). AKT1 E17K is an actionable hotspot mutation.' },
  { id:'mTOR',   x:1200, y:570, r:28, color:'#f59e0b', type:'kinase',     mutRate:5,  fullName:'mTOR (mTORC1/mTORC2)',           cancers:['kirc','brca'], drugs:['Everolimus','Temsirolimus','Rapamycin'], desc:'mTOR (mechanistic target of rapamycin) coordinates cell growth with nutrient and energy status. mTORC1 (rapamycin-sensitive) phosphorylates S6K1 and 4EBP1 to promote protein synthesis and cell growth. mTORC2 phosphorylates AKT at Ser473 (full activation). mTOR mutations activate both complexes and are seen in kidney cancer.' },
  { id:'S6K1',   x:1050, y:680, r:20, color:'#f59e0b', type:'kinase',     mutRate:2,  fullName:'S6 Kinase 1 (RPS6KB1)',         cancers:['brca'], drugs:[], desc:'S6K1 is phosphorylated by mTORC1 and promotes ribosome biogenesis and mRNA translation, fueling cell growth. Amplified in ~10% of breast cancers. S6K1 also creates a negative feedback loop suppressing PI3K signaling through IRS1 phosphorylation.' },
  { id:'4EBP1',  x:1330, y:680, r:20, color:'#f59e0b', type:'kinase',     mutRate:2,  fullName:'4E-BP1 (EIF4EBP1)',             cancers:[], drugs:[], desc:'4E-BP1 (eIF4E-binding protein 1) is phosphorylated by mTORC1, releasing eIF4E to cap mRNA and promote translation of oncoproteins like MYC and Cyclin D1. Hyperphosphorylated 4E-BP1 is a marker of mTOR pathway activation and poor prognosis.' },
  { id:'FOXO',   x:1380, y:480, r:22, color:'#3b82f6', type:'suppressor', mutRate:4,  fullName:'FOXO Transcription Factors',    cancers:['aml'], drugs:[], desc:'FOXO family transcription factors (FOXO1, FOXO3, FOXO4) are phosphorylated by AKT, causing their nuclear exclusion and proteasomal degradation. Active FOXO drives apoptosis (BIM, PUMA), cell cycle arrest (p27), and DNA repair. Inactivation by AKT is a key survival mechanism in cancer.' },

  // ── p53 PATHWAY ──
  { id:'ATM',    x:720,  y:800, r:22, color:'#3b82f6', type:'suppressor', mutRate:5,  fullName:'ATM Serine/Threonine Kinase',   cancers:['cll','luad'], drugs:['ATM inhibitors (investigational)'], desc:'ATM is activated by double-strand DNA breaks via the MRN complex. It phosphorylates H2AX (γH2AX), CHK2, and TP53, initiating the DNA damage response. Germline ATM mutations cause ataxia-telangiectasia and modestly increase cancer risk. Somatic loss occurs in CLL and some solid tumors.' },
  { id:'MDM2',   x:760,  y:880, r:22, color:'#94a3b8', type:'oncogene',   mutRate:7,  fullName:'MDM2 Proto-Oncogene',           cancers:['sarcoma','gbm'], drugs:['MDM2 inhibitors (Navtemadlin, AMG-232)'], desc:'MDM2 is an E3 ubiquitin ligase that ubiquitinates TP53, targeting it for proteasomal degradation. MDM2 and TP53 form an autoregulatory loop: p53 transcribes MDM2, MDM2 degrades p53. MDM2 amplification (without TP53 mutation) is common in liposarcoma and GBM, making MDM2 inhibitors attractive in TP53-wild-type tumors.' },
  { id:'TP53',   x:950,  y:870, r:34, color:'#3b82f6', type:'suppressor', mutRate:35, fullName:'TP53 — Guardian of the Genome',  cancers:['brca','luad','coad','gbm','blca'], drugs:['APR-246 (p53 reactivator)'], desc:'TP53 encodes p53, the most important tumor suppressor in human cancer, mutated in >50% of all cancers. When activated by DNA damage (via ATM/ATR-CHK1/2 phosphorylation), p53 either induces cell cycle arrest (via p21) or apoptosis (via PUMA/BAX). R175H, R248W/Q, R273H, R249S are the most common hotspot mutations that lock p53 in a non-functional conformation.' },
  { id:'p21',    x:780,  y:1000, r:20, color:'#10b981', type:'suppressor', mutRate:3,  fullName:'p21 / CDKN1A',                 cancers:[], drugs:[], desc:'p21 (CDKN1A) is a CDK inhibitor transcribed by TP53 in response to DNA damage. p21 binds and inhibits CDK2/cyclin E and CDK4/6/cyclin D complexes, arresting the cell cycle at G1/S to allow DNA repair. Also helps protect cells from apoptosis in some contexts.' },
  { id:'PUMA',   x:970,  y:1000, r:20, color:'#10b981', type:'other',     mutRate:2,  fullName:'PUMA (BBC3)',                   cancers:[], drugs:[], desc:'PUMA (p53-upregulated modulator of apoptosis) is a BH3-only pro-apoptotic protein transcribed by TP53. PUMA activates BAX and BAK, releasing cytochrome c from mitochondria and initiating the caspase cascade leading to apoptosis. Central to p53-mediated programmed cell death.' },
  { id:'BCL2',   x:1120, y:880, r:22, color:'#ef4444', type:'oncogene',   mutRate:9,  fullName:'BCL-2 (Anti-apoptotic)',        cancers:['dlbc','cll'], drugs:['Venetoclax'], desc:'BCL-2 is the founding member of the BCL-2 family of apoptosis regulators, originally discovered at the t(14;18) translocation in follicular lymphoma. BCL-2 sequesters pro-apoptotic proteins (BAX, BAK), blocking cytochrome c release and apoptosis. Venetoclax (BCL-2 inhibitor) revolutionized CLL and AML treatment, achieving complete responses in patients with no prior options.' },

  // ── CELL CYCLE ──
  { id:'CCND1',  x:130,  y:950, r:22, color:'#8b5cf6', type:'oncogene',   mutRate:12, fullName:'Cyclin D1 (CCND1)',             cancers:['brca','myeloma'], drugs:['CDK4/6 inhibitors (Palbociclib)'], desc:'Cyclin D1 is the regulatory subunit that activates CDK4/6 to phosphorylate RB1. Amplified (~15% of breast cancers) or overexpressed in many cancers. The t(11;14) translocation in mantle cell lymphoma juxtaposes CCND1 to the IgH enhancer, massively overexpressing it. CDK4/6 inhibitors (palbociclib, ribociclib) are approved for HR+/HER2- breast cancer.' },
  { id:'CDK4',   x:280,  y:950, r:24, color:'#8b5cf6', type:'kinase',     mutRate:5,  fullName:'CDK4 / CDK6',                  cancers:['skcm','brca'], drugs:['Palbociclib','Ribociclib','Abemaciclib'], desc:'CDK4 and CDK6 (cyclin-dependent kinases 4 and 6) form complexes with cyclin D to phosphorylate RB1, releasing E2F transcription factors and driving G1→S cell cycle transition. Amplified in ~10% of melanomas and sarcomas. CDK4/6 inhibitors combined with endocrine therapy are standard of care in HR+/HER2- metastatic breast cancer.' },
  { id:'CDKN2A', x:130,  y:1050, r:24, color:'#3b82f6', type:'suppressor', mutRate:24, fullName:'CDKN2A (p16 / p14ARF)',       cancers:['skcm','paad','lusc'], drugs:[], desc:'CDKN2A encodes two tumor suppressors from a single locus via alternate reading frames: p16INK4a (inhibits CDK4/6, maintaining pRb active) and p14ARF (inhibits MDM2, stabilizing TP53). Homozygous deletion of CDKN2A simultaneously inactivates both the RB and p53 pathways — one of the most catastrophic single-locus losses in cancer.' },
  { id:'RB1',    x:300,  y:1050, r:26, color:'#3b82f6', type:'suppressor', mutRate:13, fullName:'Retinoblastoma Protein (RB1)',  cancers:['blca','lusc','sclc'], drugs:[], desc:'pRb is the master cell cycle brake, sequestering E2F transcription factors in G1 to prevent S-phase entry. When CDK4/6-cyclin D phosphorylates pRb, E2F is released and drives transcription of S-phase genes. The first tumor suppressor gene characterized (Knudson two-hit hypothesis, 1971). Mutated in virtually all SCLCs and many bladder cancers.' },
  { id:'E2F',    x:460,  y:1080, r:20, color:'#8b5cf6', type:'other',     mutRate:3,  fullName:'E2F Transcription Factors',    cancers:[], drugs:[], desc:'E2F family transcription factors (E2F1-8) activate S-phase genes (cyclin E, DNA polymerase, DHFR) when released from pRb sequestration. E2F1 also activates pro-apoptotic genes under conditions of DNA damage, creating a tumor-suppressive response to E2F deregulation.' },

  // ── WNT/MYC ──
  { id:'APC',    x:1200, y:900, r:28, color:'#3b82f6', type:'suppressor', mutRate:70, fullName:'APC (Adenomatous Polyposis Coli)', cancers:['coad'], drugs:[], desc:'APC is the gatekeeper of colorectal cancer, mutated in >80% of sporadic cases. APC forms the β-catenin destruction complex with AXIN1/2 and GSK3β, phosphorylating β-catenin for proteasomal degradation. APC loss causes β-catenin accumulation, nuclear translocation, and activation of Wnt target genes. Germline APC mutations cause FAP (familial adenomatous polyposis).' },
  { id:'CTNNB1', x:1350, y:980, r:26, color:'#ef4444', type:'oncogene',   mutRate:11, fullName:'β-Catenin (CTNNB1)',            cancers:['coad','hcc','ucec'], drugs:[], desc:'β-catenin is the effector of canonical Wnt signaling. When APC is lost or Wnt ligand is present, β-catenin escapes degradation, accumulates in the cytoplasm, and translocates to the nucleus where it co-activates TCF/LEF transcription factors, driving expression of MYC, Cyclin D1, and VEGF.' },
  { id:'MYC',    x:1350, y:1100, r:28, color:'#ef4444', type:'oncogene',  mutRate:20, fullName:'MYC Proto-Oncogene',            cancers:['dlbc','brca','luad'], drugs:['BET inhibitors (JQ1)','CDK7 inhibitors'], desc:'MYC drives transcription of ~15% of the human genome, controlling cell growth, metabolism, ribosome biogenesis, and differentiation. Amplified in >50% of cancers. The t(8;14) translocation in Burkitt lymphoma juxtaposes MYC to the IgH enhancer. Historically considered "undruggable" but BET bromodomain inhibitors (targeting BRD4-dependent MYC transcription) show promise.' },
  { id:'TCF',    x:1520, y:1050, r:20, color:'#10b981', type:'other',     mutRate:3,  fullName:'TCF/LEF Transcription Factors', cancers:[], drugs:[], desc:'TCF/LEF family transcription factors bind β-catenin in the nucleus to activate Wnt target genes including MYC, Cyclin D1, VEGF, and AXIN2. Without β-catenin, TCF/LEF associate with transcriptional repressors to repress these genes.' },

  // ── DNA REPAIR ──
  { id:'BRCA1',  x:1620, y:280, r:26, color:'#f472b6', type:'suppressor', mutRate:15, fullName:'BRCA1',                         cancers:['brca','ov'], drugs:['Olaparib','Rucaparib','Niraparib','Talazoparib'], desc:'BRCA1 organizes the homologous recombination (HR) repair complex. It colocalizes with RAD51 at sites of DNA double-strand breaks. Germline BRCA1 mutations confer 65-72% lifetime breast cancer risk and 39-44% ovarian cancer risk. BRCA1-mutant tumors are often triple-negative breast cancers. PARP inhibitors exploit synthetic lethality with BRCA1 deficiency.' },
  { id:'BRCA2',  x:1750, y:380, r:26, color:'#f472b6', type:'suppressor', mutRate:12, fullName:'BRCA2',                         cancers:['brca','ov','paad'], drugs:['Olaparib','Rucaparib','Niraparib','Talazoparib'], desc:'BRCA2 directly loads RAD51 onto ssDNA at DSB sites, enabling strand invasion and template-directed repair. Germline BRCA2 mutations confer 45-69% lifetime breast cancer risk and ~17% pancreatic cancer risk. BRCA2-mutant pancreatic cancers respond to platinum chemotherapy and PARP inhibitors.' },
  { id:'MLH1',   x:1620, y:480, r:24, color:'#f472b6', type:'suppressor', mutRate:9,  fullName:'MLH1 (Mismatch Repair)',        cancers:['coad','ucec'], drugs:['Pembrolizumab (MSI-H)','Dostarlimab'], desc:'MLH1 is a mismatch repair (MMR) gene. MLH1 loss (via germline mutation in Lynch syndrome, or somatic promoter methylation) causes microsatellite instability (MSI-H). MSI-H tumors accumulate frameshift mutations creating abundant neoantigens, making them exquisitely sensitive to PD-1 inhibitors. Dostarlimab achieved 100% clinical complete responses in MSI-H rectal cancer.' },
  { id:'PARP1',  x:1780, y:500, r:24, color:'#f472b6', type:'other',     mutRate:2,  fullName:'PARP1 (DNA Repair Enzyme)',     cancers:['brca','ov'], drugs:['Olaparib','Niraparib','Rucaparib','Talazoparib','Veliparib'], desc:'PARP1 repairs single-strand DNA breaks. PARP inhibitors trap PARP1 on DNA, creating toxic stalled replication forks that collapse into DSBs. In BRCA1/2-deficient cells that lack HR repair, these DSBs are lethal (synthetic lethality). PARP inhibitors were the first example of synthetic lethality exploited in clinical oncology.' },
  { id:'RAD51',  x:1680, y:600, r:20, color:'#f472b6', type:'other',     mutRate:2,  fullName:'RAD51 (HR Recombinase)',        cancers:[], drugs:[], desc:'RAD51 forms a filament on single-stranded DNA at DSB sites to catalyze homology search and strand exchange during HR repair. BRCA2 loads RAD51 onto DNA; BRCA1 recruits the whole repair complex. RAD51 overexpression in cancer can promote drug resistance by enabling HR even in BRCA-mutant contexts (reversion resistance).' },
  { id:'POLE',   x:1840, y:300, r:20, color:'#f472b6', type:'other',     mutRate:3,  fullName:'DNA Polymerase ε (POLE)',       cancers:['ucec','coad'], drugs:['Pembrolizumab (POLE-mutant)'], desc:'POLE encodes the proofreading subunit of DNA polymerase ε. Hotspot mutations in the exonuclease domain (P286R, V411L) create an "ultramutator" phenotype with >100 mutations/Mb — the highest TMB in solid tumors. POLE-mutant tumors have excellent responses to PD-1 inhibitors regardless of MSI status.' },

  // ── EXTRA KEY NODES ──
  { id:'IDH1',   x:870,  y:750, r:22, color:'#ef4444', type:'oncogene',   mutRate:11, fullName:'IDH1 (Isocitrate Dehydrogenase 1)', cancers:['gbm','aml'], drugs:['Ivosidenib','Olutasidenib'], desc:'IDH1 R132H mutation produces 2-hydroxyglutarate (2-HG), an oncometabolite that inhibits TET2 and histone demethylases, causing the CpG island methylator phenotype (CIMP). IDH1 mutations are early events in low-grade gliomas and AML. IDH-mutant gliomas have better prognosis than IDH-wildtype GBM. Ivosidenib is approved for IDH1-mutant AML and cholangiocarcinoma.' },
  { id:'STAT3',  x:820,  y:490, r:22, color:'#f59e0b', type:'oncogene',   mutRate:4,  fullName:'STAT3 Transcription Factor',    cancers:['dlbc','luad'], drugs:['STAT3 inhibitors (investigational)'], desc:'STAT3 is activated downstream of multiple RTKs (JAK-STAT pathway) and directly transcribes anti-apoptotic (BCL-XL), proliferative (MYC, Cyclin D1), and pro-angiogenic (VEGF) genes. Constitutively activated in many cancers via JAK2 amplification or gain-of-function STAT3 mutations. A critical node connecting immune signaling to oncogenesis.' },
  { id:'VHL',    x:1060, y:560, r:22, color:'#3b82f6', type:'suppressor', mutRate:19, fullName:'VHL (von Hippel-Lindau)',       cancers:['kirc'], drugs:['Belzutifan (HIF-2α)'], desc:'VHL targets HIF-1α and HIF-2α for proteasomal degradation under normal oxygen conditions. Clear cell renal cell carcinoma (ccRCC) is nearly universally driven by VHL loss, which stabilizes HIF and activates VEGF, PDGF, and glucose transporter genes. Belzutifan directly inhibits HIF-2α and is approved for VHL disease and ccRCC.' },
];

const PATHWAY_EDGES = [
  // RTK → Adapters → RAS
  { from:'EGFR',   to:'GRB2',   type:'activation', label:'phospho-Y', particleColor:'#f59e0b', curve:0 },
  { from:'HER2',   to:'GRB2',   type:'activation', label:'',          particleColor:'#f59e0b', curve:30 },
  { from:'MET',    to:'GRB2',   type:'activation', label:'',          particleColor:'#f59e0b', curve:0 },
  { from:'GRB2',   to:'SOS',    type:'activation', label:'recruits',  particleColor:'#94a3b8', curve:0 },
  { from:'SOS',    to:'KRAS',   type:'activation', label:'GTP load',  particleColor:'#ef4444', curve:0 },
  { from:'NF1',    to:'KRAS',   type:'inhibition', label:'GAP',       curve:0 },

  // RAS/MAPK cascade
  { from:'KRAS',   to:'BRAF',   type:'activation', label:'activates', particleColor:'#ef4444', curve:0 },
  { from:'KRAS',   to:'RAF1',   type:'activation', label:'',          particleColor:'#ef4444', curve:-30 },
  { from:'BRAF',   to:'MEK',    type:'activation', label:'phospho',   particleColor:'#ef4444', curve:0 },
  { from:'RAF1',   to:'MEK',    type:'activation', label:'',          particleColor:'#ef4444', curve:-25 },
  { from:'MEK',    to:'ERK',    type:'activation', label:'phospho',   particleColor:'#ef4444', curve:0 },
  { from:'ERK',    to:'MYC',    type:'activation', label:'activates', particleColor:'#ef4444', curve:200, curveY:-80 },
  { from:'ERK',    to:'RSK',    type:'activation', label:'',          particleColor:'#ef4444', curve:-40 },
  { from:'ERK',    to:'MDM2',   type:'activation', label:'',          particleColor:'#ef4444', curve:0, curveY:-100 },

  // RTK → PI3K axis
  { from:'EGFR',   to:'PI3K',   type:'activation', label:'',          particleColor:'#f59e0b', curve:100, curveY:80 },
  { from:'HER2',   to:'PI3K',   type:'activation', label:'',          particleColor:'#f59e0b', curve:80 },
  { from:'MET',    to:'PI3K',   type:'activation', label:'',          particleColor:'#f59e0b', curve:30 },
  { from:'KRAS',   to:'PI3K',   type:'activation', label:'p110β',     particleColor:'#f59e0b', curve:100, curveY:-40 },

  // PI3K/AKT/mTOR cascade
  { from:'PI3K',   to:'AKT',    type:'activation', label:'PIP3→',     particleColor:'#f59e0b', curve:0 },
  { from:'PTEN',   to:'AKT',    type:'inhibition', label:'PIP3 degradation', curve:0 },
  { from:'AKT',    to:'mTOR',   type:'activation', label:'phospho',   particleColor:'#f59e0b', curve:0 },
  { from:'AKT',    to:'FOXO',   type:'inhibition', label:'nuclear exclusion', curve:30 },
  { from:'AKT',    to:'MDM2',   type:'activation', label:'stabilizes', particleColor:'#f59e0b', curve:-80, curveY:0 },
  { from:'AKT',    to:'BCL2',   type:'activation', label:'',          particleColor:'#f59e0b', curve:30 },
  { from:'mTOR',   to:'S6K1',   type:'activation', label:'phospho',   particleColor:'#f59e0b', curve:-30 },
  { from:'mTOR',   to:'4EBP1',  type:'activation', label:'phospho',   particleColor:'#f59e0b', curve:30 },
  { from:'VHL',    to:'mTOR',   type:'inhibition', label:'via HIF↓',  curve:-40 },

  // p53 pathway
  { from:'ATM',    to:'TP53',   type:'activation', label:'phospho',   particleColor:'#3b82f6', curve:0 },
  { from:'MDM2',   to:'TP53',   type:'inhibition', label:'ubiquitin', curve:0 },
  { from:'TP53',   to:'MDM2',   type:'activation', label:'transcribes', particleColor:'#3b82f6', curve:40 },
  { from:'TP53',   to:'p21',    type:'activation', label:'transcribes', particleColor:'#3b82f6', curve:0 },
  { from:'TP53',   to:'PUMA',   type:'activation', label:'transcribes', particleColor:'#3b82f6', curve:0 },
  { from:'TP53',   to:'CDKN2A', type:'activation', label:'',          particleColor:'#3b82f6', curve:-180, curveY:0 },
  { from:'BCL2',   to:'PUMA',   type:'inhibition', label:'sequesters', curve:0 },
  { from:'CDKN2A', to:'MDM2',   type:'inhibition', label:'p14ARF',    curve:0 },

  // Cell cycle
  { from:'p21',    to:'CDK4',   type:'inhibition', label:'inhibits',  curve:-30 },
  { from:'CDKN2A', to:'CDK4',   type:'inhibition', label:'p16',       curve:0 },
  { from:'CCND1',  to:'CDK4',   type:'activation', label:'complexes', particleColor:'#8b5cf6', curve:-20 },
  { from:'CDK4',   to:'RB1',    type:'inhibition', label:'phospho',   particleColor:'#8b5cf6', curve:0 },
  { from:'RB1',    to:'E2F',    type:'inhibition', label:'sequesters', curve:0 },
  { from:'E2F',    to:'CCND1',  type:'activation', label:'',          particleColor:'#8b5cf6', curve:-60, curveY:-40 },
  { from:'MYC',    to:'CCND1',  type:'activation', label:'transcribes', particleColor:'#ef4444', curve:-100, curveY:0 },
  { from:'ERK',    to:'CCND1',  type:'activation', label:'stabilizes', particleColor:'#ef4444', curve:-80, curveY:0 },

  // Wnt pathway
  { from:'APC',    to:'CTNNB1', type:'inhibition', label:'degrades',  curve:0 },
  { from:'CTNNB1', to:'TCF',    type:'activation', label:'co-activates', particleColor:'#10b981', curve:0 },
  { from:'TCF',    to:'MYC',    type:'activation', label:'transcribes', particleColor:'#10b981', curve:0 },
  { from:'CTNNB1', to:'CCND1',  type:'activation', label:'transcribes', particleColor:'#10b981', curve:-60, curveY:0 },

  // DNA repair
  { from:'BRCA1',  to:'BRCA2',  type:'activation', label:'complex',   particleColor:'#f472b6', curve:0 },
  { from:'BRCA2',  to:'RAD51',  type:'activation', label:'loads',     particleColor:'#f472b6', curve:0 },
  { from:'PARP1',  to:'BRCA1',  type:'activation', label:'recruits',  particleColor:'#f472b6', curve:40 },
  { from:'ATM',    to:'BRCA1',  type:'activation', label:'phospho',   particleColor:'#3b82f6', curve:-30 },

  // IDH1/STAT3 connections
  { from:'IDH1',   to:'TP53',   type:'activation', label:'2-HG / epigenetics', particleColor:'#ef4444', curve:60 },
  { from:'STAT3',  to:'BCL2',   type:'activation', label:'transcribes', particleColor:'#f59e0b', curve:0 },
  { from:'STAT3',  to:'MYC',    type:'activation', label:'transcribes', particleColor:'#f59e0b', curve:80, curveY:-40 },
  { from:'EGFR',   to:'STAT3',  type:'activation', label:'JAK',        particleColor:'#f59e0b', curve:0 },
];
