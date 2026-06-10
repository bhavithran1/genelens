// GeneLens AI — Complete Lesson Database
// All 3 paths: Beginner (11) + Intermediate (5) + Advanced (5)

const LESSON_DB = {

  // ═══════════════════════════════════════════════════
  //  BEGINNER PATH — 11 Lessons
  // ═══════════════════════════════════════════════════

  beginner: [
    {
      id: 'b0', title: 'Welcome to GeneLens', xp: 50, icon: '🧬',
      tags: ['intro'],
      preview: ['What GeneLens is and why it matters', 'How to earn XP and unlock lessons', 'A preview of what you will learn'],
      content: `
        <h3>What is GeneLens?</h3>
        <p>GeneLens is your <strong>interactive guide to cancer genomics</strong> — the study of how DNA changes drive cancer. Think of it like Google Maps, but instead of streets and cities, you're navigating genes, mutations, and signaling pathways inside a cell.</p>
        <div class="info-box">💡 <strong>No biology background needed.</strong> We start from scratch and build up your knowledge step by step.</div>
        <h3>How learning works here</h3>
        <ul>
          <li>📚 <strong>Lessons</strong> teach you core concepts with visuals and examples</li>
          <li>✅ <strong>Knowledge Checks</strong> test your understanding and award XP</li>
          <li>🏆 <strong>Achievements</strong> unlock as you master each section</li>
          <li>🔬 <strong>Explorer</strong> lets you click around the genome interactively</li>
        </ul>
        <h3>Your learning journey</h3>
        <table><tr><th>Path</th><th>Focus</th><th>Who it's for</th></tr>
          <tr><td>🟢 Beginner</td><td>DNA basics → what cancer is</td><td>Everyone</td></tr>
          <tr><td>🟡 Intermediate</td><td>Real cancer genomics data</td><td>Bio/pre-med students</td></tr>
          <tr><td>🔴 Advanced</td><td>Computational analysis tools</td><td>Bioinformatics learners</td></tr>
        </table>`,
      quiz: { question: 'What does GeneLens help you explore?', options: ['City maps and geography', 'Genes and mutations that drive cancer', 'Chemical reactions in the lab', 'Medical imaging like MRI'], correct: 1, exp: 'GeneLens is a cancer genomics education platform — it maps genes, mutations, and pathways inside cells.' }
    },

    {
      id: 'b1', title: 'DNA: The Blueprint of Life', xp: 80, icon: '🔬',
      tags: ['dna', 'basics'],
      preview: ['What DNA actually is (and isn\'t)', 'Why A pairs with T and C pairs with G', 'Key numbers: how long is your DNA?'],
      content: `
        <h3>DNA is just a molecule</h3>
        <p>Deoxyribonucleic acid (DNA) is a long, double-stranded molecule shaped like a twisted ladder — the famous <strong>double helix</strong>. The "rungs" of the ladder are pairs of chemical bases:</p>
        <div class="info-box">🅰️ Adenine (A) always pairs with Thymine (T)<br>🔵 Cytosine (C) always pairs with Guanine (G)</div>
        <p>This pairing rule is called <strong>Watson-Crick base pairing</strong>, and it's what makes DNA so reliable — if you know one strand, you can always rebuild the other.</p>
        <h3>From DNA to proteins</h3>
        <p>DNA carries instructions for making proteins. The flow of information goes:</p>
        <div style="text-align:center;font-size:1.1em;margin:1rem 0;">🧬 DNA → 📝 mRNA → ⚙️ Protein</div>
        <p>This is called the <strong>Central Dogma of Molecular Biology</strong>. Every trait you have — eye color, blood type, how your cells grow — comes from proteins made by this process.</p>
        <h3>Mind-blowing numbers</h3>
        <table><tr><th>Fact</th><th>Number</th></tr>
          <tr><td>Base pairs in human genome</td><td>~3.2 billion</td></tr>
          <tr><td>Protein-coding genes</td><td>~20,000</td></tr>
          <tr><td>Length if uncoiled</td><td>~2 meters per cell</td></tr>
          <tr><td>Cells in your body</td><td>~37 trillion</td></tr>
        </table>
        <div class="info-box">💡 If you stretched out all the DNA in your body end-to-end, it would reach the Sun and back over 60 times.</div>`,
      quiz: { question: 'Which base pairs with Adenine in DNA?', options: ['Guanine', 'Cytosine', 'Thymine', 'Uracil'], correct: 2, exp: 'In DNA, Adenine always pairs with Thymine. Cytosine pairs with Guanine. (Uracil appears in RNA, not DNA.)' }
    },

    {
      id: 'b2', title: 'Genes: Instructions in the Code', xp: 80, icon: '📜',
      tags: ['genes', 'basics'],
      preview: ['What a gene actually is', 'The difference between exons and introns', 'How the same gene can make different proteins'],
      content: `
        <h3>A gene is a recipe</h3>
        <p>A <strong>gene</strong> is a stretch of DNA that contains instructions for making a specific protein. Out of 3.2 billion base pairs, only about 1.5% codes for proteins — the rest is regulatory sequences, structural elements, and regions we're still figuring out.</p>
        <h3>Exons and introns</h3>
        <p>Genes are split into sections:</p>
        <table><tr><th>Section</th><th>What it does</th></tr>
          <tr><td><strong>Exons</strong></td><td>The parts that actually code for protein ("expressed regions")</td></tr>
          <tr><td><strong>Introns</strong></td><td>Intervening sequences — spliced out before translation</td></tr>
          <tr><td><strong>Promoter</strong></td><td>A region upstream that controls when/where the gene is turned on</td></tr>
          <tr><td><strong>UTRs</strong></td><td>Untranslated regions that regulate mRNA stability and translation</td></tr>
        </table>
        <h3>Alternative splicing</h3>
        <p>The same gene can produce multiple different proteins by <strong>alternative splicing</strong> — mixing and matching which exons are included. This is why we can make ~100,000 different proteins from just ~20,000 genes. It's like having a LEGO set where the same bricks can build many different things.</p>
        <div class="info-box">🔑 <strong>Key insight:</strong> Mutations in exons change the protein directly. Mutations in promoters or regulatory regions can change <em>when</em> and <em>how much</em> protein is made — also important in cancer.</div>`,
      quiz: { question: 'What are "exons"?', options: ['Sequences that are spliced out of mRNA', 'The protein-coding portions of a gene', 'Regulatory regions upstream of a gene', 'Structural proteins that package DNA'], correct: 1, exp: 'Exons are the expressed, protein-coding portions of a gene. Introns are the non-coding sequences that are spliced out after transcription.' }
    },

    {
      id: 'b3', title: 'What is a Mutation?', xp: 100, icon: '⚡',
      tags: ['mutations', 'basics'],
      preview: ['The 4 types of mutations that matter in cancer', 'Why some mutations cause disease and others don\'t', 'Somatic vs germline mutations'],
      content: `
        <h3>DNA errors happen — constantly</h3>
        <p>Every time a cell divides, it copies ~3.2 billion base pairs. DNA polymerase is incredibly accurate — it makes about 1 error per billion bases — but with so many cells dividing so many times, mutations accumulate. Most are harmless. Some are catastrophic.</p>
        <h3>Types of mutations</h3>
        <table><tr><th>Type</th><th>What changes</th><th>Effect</th></tr>
          <tr><td>🔄 <strong>Missense</strong></td><td>One base → different amino acid</td><td>Often changes protein function</td></tr>
          <tr><td>🛑 <strong>Nonsense</strong></td><td>One base → stop codon</td><td>Truncated (shortened) protein</td></tr>
          <tr><td>📐 <strong>Frameshift</strong></td><td>Insert/delete bases (not multiples of 3)</td><td>Garbled protein from that point on</td></tr>
          <tr><td>🔁 <strong>Silent</strong></td><td>One base → same amino acid</td><td>No protein change (usually)</td></tr>
        </table>
        <div class="info-box">🧩 <strong>Analogy:</strong> Missense = changing one word in a sentence. Nonsense = a period in the middle of the sentence. Frameshift = adding a letter mid-word, garbling everything after.</div>
        <h3>Somatic vs Germline</h3>
        <p>This distinction is critical in cancer:</p>
        <table><tr><th>Type</th><th>Where it occurs</th><th>Inherited?</th></tr>
          <tr><td><strong>Somatic</strong></td><td>In body cells after fertilization</td><td>No — dies with patient</td></tr>
          <tr><td><strong>Germline</strong></td><td>In egg/sperm cells</td><td>Yes — passed to children</td></tr>
        </table>
        <p>Most cancer mutations are <strong>somatic</strong> — they happen during your lifetime. But some people inherit germline mutations (like BRCA1/2) that dramatically raise cancer risk.</p>`,
      quiz: { question: 'A mutation inserts a single extra base into a gene. What type is this?', options: ['Missense mutation', 'Silent mutation', 'Nonsense mutation', 'Frameshift mutation'], correct: 3, exp: 'Inserting (or deleting) a single base shifts the reading frame — every codon from that point on is misread, usually producing a garbled and non-functional protein.' }
    },

    {
      id: 'b4', title: 'What is Cancer?', xp: 100, icon: '🔴',
      tags: ['cancer', 'basics'],
      preview: ['Cancer is a disease of the genome', 'The 6 hallmarks of cancer', 'Why cancer is so hard to cure'],
      content: `
        <h3>Cancer = cells ignoring the rules</h3>
        <p>Cancer is not one disease — it's hundreds of diseases united by one theme: <strong>cells that divide uncontrollably and ignore signals to stop</strong>. This happens because of accumulated mutations in key genes that normally regulate cell growth.</p>
        <h3>The Hallmarks of Cancer</h3>
        <p>In 2000, Hanahan and Weinberg identified 6 biological capabilities that all cancers must acquire. They later added 4 more. These are called the <strong>Hallmarks of Cancer</strong>:</p>
        <table><tr><th>Hallmark</th><th>What it means</th></tr>
          <tr><td>🚀 Self-sufficiency in growth signals</td><td>Cancer produces its own "go" signals</td></tr>
          <tr><td>🚫 Insensitivity to anti-growth signals</td><td>Ignores "stop" signals from neighbors</td></tr>
          <tr><td>⏰ Evading apoptosis</td><td>Resists programmed cell death</td></tr>
          <tr><td>∞ Limitless replication</td><td>Bypasses the normal limit on cell divisions</td></tr>
          <tr><td>🩸 Sustained angiogenesis</td><td>Grows new blood vessels to feed itself</td></tr>
          <tr><td>🌍 Invasion and metastasis</td><td>Spreads to other organs</td></tr>
        </table>
        <div class="info-box">💡 <strong>Key insight:</strong> A single mutation is almost never enough to cause cancer. Most cancers require 4–7 mutations accumulating over years or decades — this is why cancer risk increases with age.</div>
        <h3>Driver vs Passenger mutations</h3>
        <p>Not all mutations in a cancer cell are important. <strong>Driver mutations</strong> actively promote cancer growth. <strong>Passenger mutations</strong> are neutral — they hitchhiked along for the ride during clonal expansion but don't help the tumor grow.</p>`,
      quiz: { question: 'Why does cancer risk increase with age?', options: ['Immune systems weaken with age', 'Cancer requires multiple driver mutations that accumulate over time', 'DNA repair genes are only active in youth', 'Older cells are larger and harder to control'], correct: 1, exp: 'Cancer typically requires 4-7 driver mutations to develop. These accumulate over decades, which is why cancer is primarily a disease of aging.' }
    },

    {
      id: 'b5', title: 'Oncogenes: The Accelerators', xp: 100, icon: '⚡',
      tags: ['oncogenes', 'mutations'],
      preview: ['What proto-oncogenes do normally', 'How one mutation can turn them cancerous', 'Famous oncogenes: KRAS, MYC, EGFR'],
      content: `
        <h3>From proto-oncogene to oncogene</h3>
        <p>A <strong>proto-oncogene</strong> is a normal gene that promotes cell growth when needed — like pressing the gas pedal. Through mutation, amplification, or chromosomal rearrangement, it can become an <strong>oncogene</strong> — a stuck-down gas pedal that makes cells divide constantly.</p>
        <div class="info-box">🚗 <strong>Analogy:</strong> A proto-oncogene is like a car's accelerator pedal. An oncogene is that pedal stuck to the floor.</div>
        <h3>Ways oncogenes are activated</h3>
        <table><tr><th>Mechanism</th><th>Example</th><th>Effect</th></tr>
          <tr><td>Point mutation</td><td>KRAS G12D</td><td>Protein stuck "on"</td></tr>
          <tr><td>Gene amplification</td><td>MYC amplification in neuroblastoma</td><td>Too many copies → too much protein</td></tr>
          <tr><td>Chromosomal translocation</td><td>BCR-ABL in CML (Philadelphia chromosome)</td><td>Fusion protein with uncontrolled activity</td></tr>
          <tr><td>Receptor overexpression</td><td>HER2 amplification in breast cancer</td><td>Too much receptor → over-signaling</td></tr>
        </table>
        <h3>Key oncogenes to know</h3>
        <table><tr><th>Gene</th><th>Cancer</th><th>Function</th></tr>
          <tr><td><strong>KRAS</strong></td><td>Lung, colon, pancreatic</td><td>RAS GTPase — master signaling switch</td></tr>
          <tr><td><strong>MYC</strong></td><td>Many types</td><td>Transcription factor — drives growth</td></tr>
          <tr><td><strong>EGFR</strong></td><td>Lung, brain</td><td>Growth factor receptor</td></tr>
          <tr><td><strong>HER2</strong></td><td>Breast, gastric</td><td>Growth factor receptor (amplified)</td></tr>
          <tr><td><strong>BCL2</strong></td><td>Lymphoma</td><td>Anti-apoptotic protein</td></tr>
        </table>
        <p>Oncogenes are <strong>dominant</strong> — you only need one mutated copy to cause problems.</p>`,
      quiz: { question: 'A gene that normally promotes cell growth becomes mutated so its protein is always active. This is an example of:', options: ['Tumor suppressor loss', 'Oncogene activation', 'DNA repair failure', 'Epigenetic silencing'], correct: 1, exp: 'When a proto-oncogene mutates so its product is constitutively (always) active, it becomes an oncogene — driving continuous cell proliferation.' }
    },

    {
      id: 'b6', title: 'Tumor Suppressors: The Brakes', xp: 100, icon: '🛡️',
      tags: ['tumor-suppressors', 'mutations'],
      preview: ['Tumor suppressors keep cells in check', 'The Two-Hit Hypothesis explained', 'TP53: the most mutated gene in cancer'],
      content: `
        <h3>The opposite of oncogenes</h3>
        <p><strong>Tumor suppressor genes</strong> normally slow down cell division, repair DNA damage, or trigger apoptosis (programmed cell death) when things go wrong. They are the brakes of the cell. When both copies are lost or inactivated, the brakes fail.</p>
        <div class="info-box">🚗 <strong>Analogy:</strong> A tumor suppressor is the car's brake pedal. Oncogenes are the gas. Cancer happens when the gas is stuck down AND the brakes fail.</div>
        <h3>The Two-Hit Hypothesis</h3>
        <p>In 1971, Alfred Knudson studied children with retinoblastoma (eye cancer) and proposed what is now called the <strong>Knudson Two-Hit Hypothesis</strong>:</p>
        <ul>
          <li><strong>Hit 1:</strong> One copy of the tumor suppressor gene is inactivated (inherited or acquired mutation)</li>
          <li><strong>Hit 2:</strong> The second, working copy is also lost (somatic mutation or loss of heterozygosity)</li>
          <li>Only when <strong>both</strong> copies are gone does the tumor suppressor fail</li>
        </ul>
        <p>This is why tumor suppressors are <strong>recessive</strong> at the cellular level — you need to knock out both copies.</p>
        <h3>TP53: Guardian of the Genome</h3>
        <p>TP53 is mutated in <strong>more than 50% of all human cancers</strong> — making it the most important tumor suppressor. p53 protein detects DNA damage and either:</p>
        <ul>
          <li>🛑 Halts the cell cycle to allow DNA repair</li>
          <li>💀 Triggers apoptosis if damage is too severe</li>
        </ul>
        <p>Without functional p53, cells with damaged DNA continue dividing, accumulating more mutations.</p>
        <table><tr><th>Gene</th><th>Cancers</th><th>Function</th></tr>
          <tr><td><strong>TP53</strong></td><td>>50% of all cancers</td><td>DNA damage sensor; apoptosis inducer</td></tr>
          <tr><td><strong>RB1</strong></td><td>Retinoblastoma, SCLC</td><td>Cell cycle brake; E2F sequestration</td></tr>
          <tr><td><strong>BRCA1/2</strong></td><td>Breast, ovarian</td><td>DNA double-strand break repair</td></tr>
          <tr><td><strong>APC</strong></td><td>Colorectal (>80%)</td><td>β-catenin degradation; Wnt pathway</td></tr>
          <tr><td><strong>PTEN</strong></td><td>Many types</td><td>Opposes PI3K; controls AKT</td></tr>
        </table>`,
      quiz: { question: 'What does Knudson\'s "Two-Hit Hypothesis" state?', options: ['Two oncogenes must be activated for cancer', 'Both copies of a tumor suppressor must be inactivated for cancer to develop', 'Two separate carcinogens are needed to cause cancer', 'DNA must be damaged twice in the same gene'], correct: 1, exp: 'Knudson\'s hypothesis: tumor suppressors are recessive — both alleles (copies) must be inactivated before the tumor-suppressive function is lost.' }
    },

    {
      id: 'b7', title: 'Signaling Pathways', xp: 110, icon: '📡',
      tags: ['pathways', 'signaling'],
      preview: ['How cells communicate using molecular signals', 'The RAS/MAPK and PI3K/AKT cascades', 'Why one mutation can affect hundreds of genes downstream'],
      content: `
        <h3>Cells communicate with molecular signals</h3>
        <p>Cells don't act alone. They receive signals from growth factors, hormones, and neighboring cells — and these signals are relayed inside the cell through a chain of proteins called a <strong>signaling pathway</strong>. Each protein in the chain activates the next, like falling dominoes.</p>
        <div class="info-box">📡 <strong>Analogy:</strong> A signaling pathway is like a phone tree — one call at the top triggers calls to many people below, amplifying the original message.</div>
        <h3>The RAS/MAPK Pathway</h3>
        <p>One of the most commonly mutated pathways in cancer. When a growth factor binds a receptor (like EGFR), the signal flows:</p>
        <div style="text-align:center;margin:1rem 0;font-size:1.05em;">Growth factor → EGFR → GRB2 → SOS → <strong style="color:#ef4444">RAS</strong> → RAF → MEK → ERK → Cell proliferation</div>
        <p>If <strong>KRAS</strong> is mutated (stuck "on"), it continuously signals proliferation even without a growth factor — ignoring the off switch.</p>
        <h3>The PI3K/AKT/mTOR Pathway</h3>
        <p>Controls cell survival and growth:</p>
        <div style="text-align:center;margin:1rem 0;font-size:1.05em;">Growth factor → PI3K → PIP3 → AKT → <strong style="color:#f59e0b">mTOR</strong> → Protein synthesis, survival</div>
        <p><strong>PTEN</strong> normally degrades PIP3 to turn this off. Loss of PTEN → constant AKT activity → cells won't die even when they should.</p>
        <h3>Why pathways matter for treatment</h3>
        <p>If you can identify <em>which</em> pathway is hyperactive in a patient's tumor, you can target it with a specific drug — this is called <strong>targeted therapy</strong>. For example, EGFR inhibitors (erlotinib, osimertinib) block the first step in EGFR-driven lung cancers.</p>`,
      quiz: { question: 'In the RAS/MAPK pathway, what does a KRAS mutation typically cause?', options: ['KRAS permanently shuts off, stopping cell growth', 'KRAS is permanently active, continuously signaling cells to grow', 'KRAS starts repairing DNA instead of signaling', 'KRAS activates apoptosis pathways'], correct: 1, exp: 'KRAS mutations (e.g. G12D, G12C) lock KRAS in its GTP-bound "on" state, so it continuously sends proliferative signals downstream through RAF, MEK, and ERK.' }
    },

    {
      id: 'b8', title: 'Cancer Genomics: Reading the Code', xp: 120, icon: '📊',
      tags: ['genomics', 'data'],
      preview: ['How scientists sequence cancer genomes', 'What a mutation landscape looks like', 'Key databases: TCGA, cBioPortal, ClinVar'],
      content: `
        <h3>Sequencing cancer genomes</h3>
        <p>Modern <strong>Next-Generation Sequencing (NGS)</strong> can read the entire genome of a tumor in a day. Scientists compare the tumor genome to the patient's normal cells to find somatic mutations. This gives a complete <strong>mutation landscape</strong> for that tumor.</p>
        <h3>Types of genomic alterations</h3>
        <table><tr><th>Type</th><th>Definition</th><th>Example</th></tr>
          <tr><td>SNV</td><td>Single nucleotide variant (point mutation)</td><td>KRAS G12D</td></tr>
          <tr><td>Indel</td><td>Small insertion or deletion</td><td>BRCA2 frameshift</td></tr>
          <tr><td>CNV</td><td>Copy number variation (amp or deletion)</td><td>HER2 amplification</td></tr>
          <tr><td>SV</td><td>Structural variant (large rearrangement)</td><td>BCR-ABL fusion</td></tr>
          <tr><td>MSI</td><td>Microsatellite instability (MMR failure)</td><td>Lynch syndrome tumors</td></tr>
        </table>
        <h3>Key databases</h3>
        <table><tr><th>Database</th><th>What it contains</th></tr>
          <tr><td><strong>TCGA</strong></td><td>The Cancer Genome Atlas — genomic data from >11,000 tumors across 33 cancer types</td></tr>
          <tr><td><strong>cBioPortal</strong></td><td>Interactive tool to explore TCGA and other datasets — mutation frequencies, pathways, outcomes</td></tr>
          <tr><td><strong>ClinVar</strong></td><td>Clinically interpreted variants — whether a mutation is "pathogenic" or "benign"</td></tr>
          <tr><td><strong>COSMIC</strong></td><td>Catalogue of Somatic Mutations in Cancer — curated cancer driver mutations</td></tr>
        </table>
        <div class="info-box">💡 <strong>Fun fact:</strong> TCGA found that some cancers (like MSI-High colorectal tumors) have thousands of mutations, while others (like AML) typically have fewer than 10 driver events.</div>`,
      quiz: { question: 'What does "somatic mutation" mean in cancer genomics?', options: ['A mutation inherited from a parent', 'A mutation in stem cells', 'A mutation acquired during life, not inherited', 'A mutation that always causes cancer'], correct: 2, exp: 'Somatic mutations are acquired during a person\'s lifetime in body (somatic) cells — not inherited through the germline. They die with the patient and are not passed to children.' }
    },

    {
      id: 'b9', title: 'Targeted Therapy', xp: 120, icon: '🎯',
      tags: ['treatment', 'drugs'],
      preview: ['How targeted drugs work differently than chemotherapy', 'Tyrosine kinase inhibitors: the first wave', 'The problem of acquired resistance'],
      content: `
        <h3>Precision medicine: hitting the right target</h3>
        <p>Traditional chemotherapy kills all rapidly-dividing cells — cancer cells AND healthy ones (hair follicles, gut lining, immune cells). <strong>Targeted therapy</strong> blocks specific molecules that drive a particular cancer, causing fewer side effects and often greater effectiveness.</p>
        <div class="info-box">🎯 <strong>Key concept:</strong> Targeted therapy only works if the patient's tumor has the specific alteration the drug targets. This is why tumor genomic testing (molecular profiling) is now standard of care.</div>
        <h3>Tyrosine Kinase Inhibitors (TKIs)</h3>
        <p>Kinases add phosphate groups to proteins, switching them on. Many oncogenes are mutated kinases. TKIs block their active site:</p>
        <table><tr><th>Drug</th><th>Target</th><th>Cancer</th></tr>
          <tr><td>Imatinib (Gleevec)</td><td>BCR-ABL</td><td>CML (chronic myeloid leukemia)</td></tr>
          <tr><td>Erlotinib / Osimertinib</td><td>EGFR mutations</td><td>Lung adenocarcinoma</td></tr>
          <tr><td>Vemurafenib / Dabrafenib</td><td>BRAF V600E</td><td>Melanoma</td></tr>
          <tr><td>Alectinib / Lorlatinib</td><td>ALK fusions</td><td>Lung adenocarcinoma</td></tr>
          <tr><td>Sotorasib</td><td>KRAS G12C</td><td>Lung, colon</td></tr>
        </table>
        <h3>The resistance problem</h3>
        <p>Most targeted therapies eventually stop working. Tumors develop <strong>acquired resistance</strong> through:</p>
        <ul>
          <li>A second mutation in the target (e.g. EGFR T790M)</li>
          <li>Amplification of the target gene</li>
          <li>Activation of an alternative bypass pathway</li>
          <li>Lineage plasticity (cancer cells change their identity)</li>
        </ul>
        <p>This is why combination therapy (hitting multiple targets simultaneously) often works better than single-agent therapy.</p>`,
      quiz: { question: 'Why do targeted therapies require tumor genomic testing before use?', options: ['To calculate the correct dose', 'To confirm the tumor has the specific alteration the drug targets', 'To determine if the patient can afford the drug', 'To check for allergies to the drug'], correct: 1, exp: 'Targeted therapies are only effective if the patient\'s tumor carries the specific mutation or alteration the drug was designed to block. Without testing, you can\'t know if the drug will work.' }
    },

    {
      id: 'b10', title: 'Immunotherapy: Unleashing the Immune System', xp: 130, icon: '🛡',
      tags: ['immunotherapy', 'treatment'],
      preview: ['How cancer hides from the immune system', 'Checkpoint inhibitors: PD-1, PD-L1, CTLA-4', 'Who responds best to immunotherapy'],
      content: `
        <h3>The immune system can fight cancer</h3>
        <p>Your immune system patrols the body, looking for abnormal cells. T cells (a type of immune cell) can recognize and kill cancer cells — but cancer has evolved tricks to evade detection. <strong>Immunotherapy</strong> removes those tricks.</p>
        <h3>Immune checkpoints</h3>
        <p>To prevent attacking normal cells, T cells have "off switches" called <strong>immune checkpoints</strong>. Cancer cells exploit these to avoid being killed:</p>
        <table><tr><th>Checkpoint</th><th>Normal role</th><th>Cancer exploit</th></tr>
          <tr><td><strong>PD-1/PD-L1</strong></td><td>Limits T cell activity in tissues</td><td>Tumor cells express PD-L1 to "hide"</td></tr>
          <tr><td><strong>CTLA-4</strong></td><td>Limits T cell activation in lymph nodes</td><td>Reduces T cell priming against cancer</td></tr>
        </table>
        <h3>Checkpoint inhibitors</h3>
        <p>Drugs that <strong>block these checkpoints</strong> release the brakes on T cells, allowing them to attack cancer again:</p>
        <table><tr><th>Drug</th><th>Target</th><th>Approved cancer types</th></tr>
          <tr><td>Pembrolizumab (Keytruda)</td><td>PD-1</td><td>Melanoma, lung, many others</td></tr>
          <tr><td>Nivolumab (Opdivo)</td><td>PD-1</td><td>Melanoma, NSCLC, RCC, others</td></tr>
          <tr><td>Atezolizumab (Tecentriq)</td><td>PD-L1</td><td>Bladder, lung, breast</td></tr>
          <tr><td>Ipilimumab (Yervoy)</td><td>CTLA-4</td><td>Melanoma, lung (+ combo)</td></tr>
        </table>
        <h3>Who responds best?</h3>
        <p>Not everyone responds to immunotherapy. Key <strong>biomarkers</strong> that predict response:</p>
        <ul>
          <li><strong>TMB (Tumor Mutational Burden)</strong> — more mutations = more neoantigens = more T cell targets</li>
          <li><strong>MSI-H</strong> — microsatellite-unstable tumors have lots of frameshift mutations → many neoantigens</li>
          <li><strong>PD-L1 expression</strong> — measured by IHC, correlates with checkpoint dependence</li>
        </ul>
        <div class="info-box">🏆 <strong>Landmark moment:</strong> In 2022, a clinical trial using dostarlimab (PD-1 inhibitor) achieved 100% clinical complete response in MSI-H rectal cancer patients — every single patient went into remission without surgery, chemotherapy, or radiation.</div>`,
      quiz: { question: 'What do checkpoint inhibitor drugs do?', options: ['Directly kill cancer cells with toxic chemicals', 'Block proteins that suppress the immune system, releasing T cells to attack cancer', 'Deliver radioactive material to tumor cells', 'Prevent blood vessels from feeding tumors'], correct: 1, exp: 'Checkpoint inhibitors (anti-PD-1, anti-CTLA-4) block the "off switches" that cancer cells exploit to hide from T cells, allowing the immune system to recognize and destroy the tumor.' }
    },
  ],

  // ═══════════════════════════════════════════════════
  //  INTERMEDIATE PATH — 5 Lessons
  // ═══════════════════════════════════════════════════

  intermediate: [
    {
      id: 'i0', title: 'Breast Cancer Genomics', xp: 150, icon: '🎗',
      tags: ['breast-cancer', 'subtypes', 'HER2', 'BRCA'],
      preview: ['The 4 molecular subtypes of breast cancer', 'Why HER2+ and triple-negative need different drugs', 'BRCA1/2 and hereditary risk'],
      content: `
        <h3>Breast cancer is not one disease</h3>
        <p>Gene expression profiling reveals that "breast cancer" is actually <strong>at least 4 distinct molecular subtypes</strong> with different drivers, behaviors, and treatment approaches. Getting the subtype right is critical for treatment decisions.</p>
        <h3>The four intrinsic subtypes</h3>
        <table><tr><th>Subtype</th><th>Markers</th><th>% of cases</th><th>Key driver</th></tr>
          <tr><td><strong>Luminal A</strong></td><td>ER+/PR+, HER2−, low Ki-67</td><td>~40%</td><td>Estrogen receptor (indolent)</td></tr>
          <tr><td><strong>Luminal B</strong></td><td>ER+/PR+, HER2± high Ki-67</td><td>~20%</td><td>ER + proliferative signals</td></tr>
          <tr><td><strong>HER2-enriched</strong></td><td>HER2+, ER−, PR−</td><td>~15%</td><td>HER2 amplification (17q12)</td></tr>
          <tr><td><strong>Triple-negative (TNBC)</strong></td><td>ER−, PR−, HER2−</td><td>~15%</td><td>Diverse — BRCA1, PIK3CA, MYC</td></tr>
        </table>
        <h3>HER2-positive breast cancer</h3>
        <p>HER2 is amplified (extra gene copies on chromosome 17q12) in ~20% of breast cancers. Amplification leads to massive receptor overexpression, driving proliferation. Treatment targets the HER2 protein:</p>
        <ul>
          <li><strong>Trastuzumab (Herceptin)</strong> — monoclonal antibody; transformed HER2+ from worst to best prognosis</li>
          <li><strong>Pertuzumab</strong> — blocks HER2 dimerization (combo with trastuzumab)</li>
          <li><strong>T-DXd (trastuzumab deruxtecan)</strong> — antibody-drug conjugate; active even in HER2-low disease</li>
          <li><strong>Tucatinib</strong> — small molecule TKI; CNS-active for brain metastases</li>
        </ul>
        <h3>Triple-Negative Breast Cancer (TNBC)</h3>
        <p>TNBC has no estrogen receptor, progesterone receptor, or HER2 to target — historically limited to chemotherapy. Recent advances:</p>
        <ul>
          <li><strong>PARP inhibitors</strong> (olaparib, talazoparib) for BRCA1/2-mutant TNBC</li>
          <li><strong>Sacituzumab govitecan</strong> — antibody-drug conjugate targeting TROP2</li>
          <li><strong>Pembrolizumab</strong> — PD-1 inhibitor for PD-L1+ TNBC (high TMB)</li>
          <li><strong>PIK3CA inhibitors</strong> — alpelisib for PIK3CA-mutant tumors (not typical in TNBC but occurring)</li>
        </ul>
        <h3>BRCA1/2 and hereditary risk</h3>
        <p>BRCA1 and BRCA2 maintain genomic integrity by repairing double-strand breaks via homologous recombination. Germline mutations disrupt repair, leading to accumulated genome instability.</p>
        <table><tr><th>Gene</th><th>Lifetime breast risk</th><th>Lifetime ovarian risk</th><th>Other cancers</th></tr>
          <tr><td><strong>BRCA1</strong></td><td>65–72%</td><td>39–44%</td><td>Pancreatic (rare)</td></tr>
          <tr><td><strong>BRCA2</strong></td><td>45–69%</td><td>~17%</td><td>Pancreatic (~7%), prostate</td></tr>
          <tr><td>General pop.</td><td>~12%</td><td>~1.3%</td><td>—</td></tr>
        </table>
        <div class="info-box">🧬 <strong>Synthetic lethality:</strong> BRCA1/2-deficient cells rely on PARP-mediated single-strand break repair. PARP inhibitors block this backup pathway, killing BRCA-deficient cells while sparing normal cells — the first clinical application of synthetic lethality.</div>`,
      quiz: { question: 'Which breast cancer subtype is characterized by ER−, PR−, HER2− status?', options: ['Luminal A', 'HER2-enriched', 'Triple-negative (TNBC)', 'Luminal B'], correct: 2, exp: 'Triple-negative breast cancer (TNBC) lacks estrogen receptor, progesterone receptor, and HER2 amplification — making it the hardest subtype to treat with targeted therapies.' }
    },

    {
      id: 'i1', title: 'Lung Cancer Driver Mutations', xp: 150, icon: '🫁',
      tags: ['lung-cancer', 'EGFR', 'ALK', 'KRAS'],
      preview: ['Lung adenocarcinoma vs squamous cell carcinoma', 'The major driver mutations: EGFR, ALK, KRAS, RET, MET', 'How molecular testing changed lung cancer treatment'],
      content: `
        <h3>Lung cancer subtypes</h3>
        <p>Lung cancer is broadly split into <strong>Non-Small Cell Lung Cancer (NSCLC)</strong> (~85%) and Small Cell Lung Cancer (SCLC, ~15%). NSCLC includes:</p>
        <table><tr><th>Histology</th><th>% of NSCLC</th><th>Common mutations</th></tr>
          <tr><td><strong>Adenocarcinoma (LUAD)</strong></td><td>~40%</td><td>EGFR, ALK, ROS1, KRAS, BRAF, MET, RET, NTRK</td></tr>
          <tr><td><strong>Squamous cell (LUSC)</strong></td><td>~30%</td><td>FGFR1, DDR2, PIK3CA, CDKN2A del, SOX2</td></tr>
          <tr><td><strong>Large cell</strong></td><td>~10%</td><td>Heterogeneous</td></tr>
        </table>
        <h3>EGFR mutations (~20% of LUAD)</h3>
        <p>EGFR activating mutations in exons 18–21 are the most actionable alterations in lung cancer:</p>
        <table><tr><th>Mutation</th><th>Frequency</th><th>Drug</th></tr>
          <tr><td>Exon 19 deletion</td><td>~45% of EGFR mut</td><td>Osimertinib (best)</td></tr>
          <tr><td>L858R point mutation</td><td>~40%</td><td>Osimertinib, gefitinib</td></tr>
          <tr><td>T790M (resistance)</td><td>Acquired ~60%</td><td>Osimertinib overcomes</td></tr>
          <tr><td>Exon 20 insertion</td><td>~4%</td><td>Amivantamab, mobocertinib</td></tr>
        </table>
        <h3>ALK fusions (~5% of LUAD)</h3>
        <p>Chromosomal inversion creates EML4-ALK fusion oncogene. ALK+ patients are typically young, never-smokers. Three generations of ALK inhibitors:</p>
        <ul>
          <li><strong>1st gen:</strong> Crizotinib — effective but brain penetration poor</li>
          <li><strong>2nd gen:</strong> Alectinib, ceritinib, brigatinib — better CNS, overcome crizotinib resistance</li>
          <li><strong>3rd gen:</strong> Lorlatinib — penetrates brain, overcomes compound resistance mutations</li>
        </ul>
        <h3>KRAS G12C: The "undruggable" gene, drugged</h3>
        <p>KRAS mutations are the most common in LUAD (~30%), but were historically undruggable because KRAS lacks a good binding pocket for small molecules. The G12C mutation creates a unique cysteine that:</p>
        <ul>
          <li>Reacts with covalent inhibitors (sotorasib, adagrasib)</li>
          <li>First KRAS inhibitors approved in 2021 after 40 years of failure</li>
          <li>Best responses in patients with no co-mutations (STK11-WT, KEAP1-WT)</li>
        </ul>
        <h3>Other actionable targets</h3>
        <table><tr><th>Target</th><th>Frequency</th><th>Drug</th></tr>
          <tr><td>RET fusions</td><td>~2%</td><td>Selpercatinib, pralsetinib</td></tr>
          <tr><td>MET exon 14 skipping</td><td>~3%</td><td>Capmatinib, tepotinib</td></tr>
          <tr><td>ROS1 fusions</td><td>~2%</td><td>Crizotinib, entrectinib</td></tr>
          <tr><td>NTRK fusions</td><td><1%</td><td>Larotrectinib, entrectinib</td></tr>
          <tr><td>BRAF V600E</td><td>~2%</td><td>Dabrafenib + trametinib</td></tr>
        </table>
        <div class="info-box">💡 Today, standard of care for metastatic LUAD requires comprehensive molecular profiling before starting treatment — at least EGFR, ALK, ROS1, KRAS, BRAF, MET, RET, NTRK, plus PD-L1 and TMB.</div>`,
      quiz: { question: 'Why was KRAS considered "undruggable" for 40 years?', options: ['KRAS mutations are too rare to study', 'KRAS lacks an obvious binding pocket for small molecule drugs', 'KRAS inhibitors cause fatal side effects', 'KRAS is located in an inaccessible part of the cell'], correct: 1, exp: 'KRAS has very high affinity for GTP/GDP and lacks a clear hydrophobic pocket for small molecules to bind. The G12C mutation creates a unique covalent-reactive cysteine that covalent inhibitors (sotorasib, adagrasib) can trap in the inactive GDP-bound state.' }
    },

    {
      id: 'i2', title: 'The PI3K/AKT/mTOR Pathway In-Depth', xp: 160, icon: '⚙',
      tags: ['PI3K', 'AKT', 'mTOR', 'pathways'],
      preview: ['How PI3K converts a growth signal into cell survival', 'PTEN: the pathway\'s off switch', 'mTOR as a master coordinator of cell growth'],
      content: `
        <h3>The pathway that keeps cells alive</h3>
        <p>The PI3K/AKT/mTOR pathway is the master regulator of cell survival, growth, and metabolism. It's hyperactivated in a majority of human cancers — through PIK3CA mutations, PTEN loss, AKT amplification, or upstream RTK activation.</p>
        <h3>Step by step: how it works</h3>
        <p><strong>1. Receptor Tyrosine Kinase activation</strong></p>
        <p>A growth factor (EGF, HER2 signal, insulin) binds its receptor → receptor dimerizes and autophosphorylates its intracellular tyrosine residues.</p>
        <p><strong>2. PI3K recruitment and activation</strong></p>
        <p>PI3Kα (PIK3CA gene) is recruited to the membrane. Its p85 regulatory subunit binds phosphotyrosine; the p110 catalytic subunit converts PIP2 → PIP3. PIK3CA hotspot mutations (H1047R, E545K, E542K) activate PI3K without RTK input.</p>
        <p><strong>3. PTEN: the off switch</strong></p>
        <p>PTEN phosphatase reverses PI3K's action: PIP3 → PIP2. PTEN is the second most commonly lost tumor suppressor. Loss = constitutive PIP3 accumulation.</p>
        <p><strong>4. AKT activation</strong></p>
        <p>PIP3 recruits AKT to the membrane where PDK1 phosphorylates Thr308, and mTORC2 phosphorylates Ser473 (full activation). AKT then phosphorylates >100 substrates:</p>
        <table><tr><th>AKT substrate</th><th>Effect</th></tr>
          <tr><td>MDM2 (Ser166)</td><td>Promotes p53 degradation → suppresses apoptosis</td></tr>
          <tr><td>BAD (Ser136)</td><td>Sequesters BAD from BCL-2 → blocks apoptosis</td></tr>
          <tr><td>FOXO1/3 (Thr24)</td><td>Nuclear export → loss of growth arrest and apoptosis transcription</td></tr>
          <tr><td>GSK3β (Ser9)</td><td>Inhibits GSK3β → stabilizes cyclin D1, MYC, β-catenin</td></tr>
          <tr><td>TSC2 (Ser939)</td><td>Inhibits TSC1/2 complex → activates Rheb → activates mTORC1</td></tr>
        </table>
        <p><strong>5. mTOR: coordinator of growth</strong></p>
        <p>mTOR exists in two complexes. mTORC1 (rapamycin-sensitive) phosphorylates S6K1 and 4E-BP1 to drive ribosome biogenesis, protein synthesis, and nucleotide/lipid metabolism. mTORC2 phosphorylates AKT Ser473.</p>
        <h3>Targeting this pathway</h3>
        <table><tr><th>Drug class</th><th>Examples</th><th>Use</th></tr>
          <tr><td>PI3K inhibitors</td><td>Alpelisib (α-selective), copanlisib</td><td>PIK3CA-mutant HR+/HER2- breast cancer</td></tr>
          <tr><td>AKT inhibitors</td><td>Capivasertib, ipatasertib</td><td>PIK3CA/AKT/PTEN-altered breast cancer</td></tr>
          <tr><td>mTOR inhibitors</td><td>Everolimus, temsirolimus</td><td>RCC, HR+ breast cancer, TSC</td></tr>
        </table>
        <div class="info-box">⚠️ <strong>Feedback loops complicate therapy:</strong> mTORC1 inhibition activates a negative feedback loop that reactivates AKT (via IRS-1/PI3K). This is why single-agent mTOR inhibitors often have limited efficacy and combination strategies (PI3K + mTOR) are being explored.</div>`,
      quiz: { question: 'What does PTEN do in the PI3K/AKT/mTOR pathway?', options: ['Activates AKT by phosphorylating it', 'Converts PIP2 to PIP3, amplifying the signal', 'Dephosphorylates PIP3 back to PIP2, opposing PI3K', 'Promotes mTOR complex assembly'], correct: 2, exp: 'PTEN is a phosphatase that converts PIP3 back to PIP2, directly counteracting PI3K. Loss of PTEN leads to accumulated PIP3, constitutive AKT activation, and continuous cell survival signaling.' }
    },

    {
      id: 'i3', title: 'Immunotherapy Biomarkers', xp: 160, icon: '🔬',
      tags: ['immunotherapy', 'TMB', 'MSI', 'biomarkers'],
      preview: ['TMB: why mutation-heavy tumors respond to immunotherapy', 'MSI-H and the mismatch repair system', 'PD-L1 expression as a biomarker'],
      content: `
        <h3>Why do some cancers respond to checkpoint inhibitors and others don't?</h3>
        <p>The key is <strong>immunogenicity</strong> — whether the immune system can "see" the tumor. The more foreign-looking a cancer is (due to mutations creating novel peptides), the more T cells can attack it. Biomarkers help predict this.</p>
        <h3>Tumor Mutational Burden (TMB)</h3>
        <p>TMB measures the total number of somatic mutations per megabase (Mb) of genome sequenced in a tumor. More mutations = more <strong>neoantigens</strong> (novel peptides presented by MHC-I that T cells can recognize).</p>
        <table><tr><th>TMB level</th><th>Definition</th><th>Response to IO</th></tr>
          <tr><td>TMB-High</td><td>>10 mut/Mb (FDA cutoff)</td><td>Better checkpoint inhibitor response</td></tr>
          <tr><td>TMB-Low</td><td><10 mut/Mb</td><td>Less responsive</td></tr>
        </table>
        <p><strong>Highest TMB tumors:</strong> POLE/POLD1 exonuclease mutants (>100 mut/Mb), MSI-H colorectal (~40 mut/Mb), UV-induced melanoma (~20 mut/Mb), smoking-associated lung cancer (~10-15 mut/Mb).</p>
        <p><strong>Pembrolizumab</strong> received histology-agnostic FDA approval for TMB-High tumors (≥10 mut/Mb) — the first cancer approval based on a genomic biomarker regardless of cancer type.</p>
        <h3>Microsatellite Instability (MSI)</h3>
        <p><strong>Microsatellites</strong> are short tandem repeat sequences throughout the genome. <strong>Mismatch Repair (MMR)</strong> proteins (MLH1, MSH2, MSH6, PMS2) correct replication errors at these repeats.</p>
        <p>When MMR is lost (via MLH1 promoter methylation, or Lynch syndrome germline mutation in MMR genes), microsatellites accumulate insertions and deletions → <strong>MSI-High (MSI-H)</strong>. These indels create frameshifted proteins = abundant neoantigens = immunogenic tumors.</p>
        <table><tr><th>MSI status</th><th>Prevalence</th><th>Cancer types enriched</th></tr>
          <tr><td>MSI-H / dMMR</td><td>~5% of all cancers</td><td>Colorectal (15%), endometrial (25%), gastric</td></tr>
          <tr><td>MSS / pMMR</td><td>~95%</td><td>Most cancer types</td></tr>
        </table>
        <div class="info-box">🏆 <strong>The dostarlimab trial (2022):</strong> Every single patient (12/12) with locally advanced MSI-H rectal cancer achieved complete clinical remission on the PD-1 inhibitor dostarlimab — without surgery, chemo, or radiation. A landmark moment in oncology.</div>
        <h3>PD-L1 expression</h3>
        <p>Tumor cells express PD-L1 (programmed death-ligand 1) on their surface, binding PD-1 on T cells to suppress them. PD-L1 is measured by immunohistochemistry (IHC) and reported as:</p>
        <ul>
          <li><strong>TPS (Tumor Proportion Score)</strong> — % of tumor cells staining positive (used in NSCLC)</li>
          <li><strong>CPS (Combined Positive Score)</strong> — broader score including immune cells (used in other cancers)</li>
        </ul>
        <p>PD-L1 ≥50% TPS → first-line pembrolizumab monotherapy for NSCLC. But PD-L1 is imperfect: some PD-L1-low tumors respond, and some PD-L1-high tumors don't.</p>`,
      quiz: { question: 'Why do MSI-High tumors respond particularly well to checkpoint inhibitors?', options: ['They have mutated PD-L1 genes that can\'t suppress T cells', 'Loss of mismatch repair creates abundant frameshifted neoantigens that T cells can recognize', 'They produce anti-inflammatory cytokines that boost T cell activity', 'MSI-H tumors grow slower, giving T cells more time to act'], correct: 1, exp: 'MSI-H tumors have defective mismatch repair, causing accumulation of insertion/deletion errors in coding sequences. These frameshifts create many novel peptides (neoantigens) that T cells recognize as foreign — making the tumor highly immunogenic and responsive to PD-1/CTLA-4 blockade.' }
    },

    {
      id: 'i4', title: 'Reading Mutation Landscapes', xp: 170, icon: '📊',
      tags: ['data', 'visualization', 'TCGA', 'OncoPrint'],
      preview: ['How to read an OncoPrint (mutation heatmap)', 'Understanding mutation frequency and co-occurrence', 'What lollipop plots and waterfall plots show'],
      content: `
        <h3>Visualizing cancer genomics data</h3>
        <p>Cancer genomics generates enormous datasets. Researchers use specific visualizations to extract biological insight. Learning to read these plots is a core skill in cancer genomics.</p>
        <h3>The OncoPrint</h3>
        <p>An OncoPrint displays genomic alterations for a set of genes across many patient samples:</p>
        <ul>
          <li>Each <strong>column</strong> = one patient sample</li>
          <li>Each <strong>row</strong> = one gene</li>
          <li>Color/shape encodes alteration type: green = amplification, blue = deep deletion, red = missense, black = truncating</li>
          <li>Samples are sorted by alteration burden — most altered on the left</li>
        </ul>
        <p>OncoPrints let you instantly see: How often is each gene altered? Do mutations co-occur or are they mutually exclusive?</p>
        <h3>Mutual exclusivity: the key insight</h3>
        <p>In the RAS/MAPK pathway, KRAS and BRAF mutations are almost <strong>mutually exclusive</strong> — a tumor rarely has both. This makes biological sense: one mutation already locks the pathway "on," so a second mutation provides no additional growth advantage.</p>
        <div class="info-box">💡 Mutual exclusivity is powerful evidence that two genes are in the same pathway. Co-occurrence suggests they may cooperate or are in parallel pathways.</div>
        <h3>Lollipop plots</h3>
        <p>Shows mutation positions along a protein's amino acid sequence. Each "lollipop" = one mutation, height = frequency. Clustering at hotspots reveals functionally important residues:</p>
        <ul>
          <li><strong>KRAS:</strong> Codons 12, 13 (G12D, G12C, G12V), 61 — all in the GTP-binding domain</li>
          <li><strong>TP53:</strong> R175H, R248W/Q, R273H, R249S — DNA-binding domain hotspots</li>
          <li><strong>PIK3CA:</strong> E542K, E545K (helical domain) and H1047R (kinase domain)</li>
        </ul>
        <h3>Waterfall plots (swimmer plots)</h3>
        <p>Show treatment response across patients — bars going right = tumor shrinkage (response), bars going left = tumor growth (progression). Used to communicate clinical trial results intuitively.</p>
        <h3>Mutational signatures</h3>
        <p>Every mutational process leaves a characteristic pattern (signature). COSMIC lists 60+ signatures:</p>
        <table><tr><th>Signature</th><th>Cause</th><th>Seen in</th></tr>
          <tr><td>SBS4</td><td>Tobacco smoke (C>A transversions)</td><td>Lung, head & neck</td></tr>
          <tr><td>SBS7a/b</td><td>UV radiation (C>T at TpC)</td><td>Melanoma, skin</td></tr>
          <tr><td>SBS1</td><td>Spontaneous deamination (aging)</td><td>Many cancer types</td></tr>
          <tr><td>SBS13</td><td>APOBEC deaminases (C>G at TpC)</td><td>Breast, cervical, bladder</td></tr>
          <tr><td>SBS6</td><td>MMR deficiency</td><td>MSI-H colorectal, endometrial</td></tr>
        </table>`,
      quiz: { question: 'KRAS and BRAF mutations are almost never found together in the same tumor. What does this "mutual exclusivity" suggest?', options: ['The two genes are located on the same chromosome', 'KRAS and BRAF operate in the same signaling pathway — one mutation is sufficient', 'The two mutations cancel each other out and are lethal together', 'One gene repairs the other when mutated'], correct: 1, exp: 'Mutual exclusivity of KRAS and BRAF mutations indicates they activate the same downstream pathway (RAS/MAPK). A single activating mutation is sufficient to lock the pathway "on" — a second hit in the same pathway provides no additional advantage.' }
    },
  ],

  // ═══════════════════════════════════════════════════
  //  ADVANCED PATH — 5 Lessons
  // ═══════════════════════════════════════════════════

  advanced: [
    {
      id: 'a0', title: 'Variant Calling & Annotation', xp: 200, icon: '💻',
      tags: ['bioinformatics', 'NGS', 'variant-calling'],
      preview: ['The NGS pipeline: FASTQ to VCF', 'How variant callers distinguish true mutations from noise', 'Functional annotation with VEP and ANNOVAR'],
      content: `
        <h3>From sequencing machine to mutation list</h3>
        <p>Identifying cancer mutations from raw sequencing data is a computational pipeline. Understanding each step is essential for interpreting results and avoiding artifacts.</p>
        <h3>The standard somatic variant calling pipeline</h3>
        <table><tr><th>Step</th><th>Tool(s)</th><th>Input → Output</th></tr>
          <tr><td>1. Quality control</td><td>FastQC, Trimmomatic, fastp</td><td>FASTQ → trimmed FASTQ</td></tr>
          <tr><td>2. Alignment</td><td>BWA-MEM2, STAR (RNA)</td><td>FASTQ → BAM</td></tr>
          <tr><td>3. Duplicate marking</td><td>Picard MarkDuplicates, samblaster</td><td>BAM → BAM (deduped)</td></tr>
          <tr><td>4. Base quality recalibration</td><td>GATK BQSR</td><td>BAM → calibrated BAM</td></tr>
          <tr><td>5. Variant calling</td><td>GATK Mutect2, Strelka2, VarScan2</td><td>Tumor+Normal BAM → VCF</td></tr>
          <tr><td>6. Filtering</td><td>GATK FilterMutectCalls, custom filters</td><td>Raw VCF → filtered VCF</td></tr>
          <tr><td>7. Annotation</td><td>VEP (Ensembl), ANNOVAR, SnpEff</td><td>VCF → annotated VCF/TSV</td></tr>
        </table>
        <h3>Tumor-normal paired calling</h3>
        <p>The gold standard is sequencing both the tumor AND matched normal tissue (blood or adjacent normal) from the same patient. The variant caller finds mutations present in tumor but absent in normal, filtering out germline SNPs and sequencing artifacts.</p>
        <p>Without a matched normal, callers use population databases (gnomAD, 1000 Genomes) to exclude common germline variants — but this misses rare germline variants and increases false positives.</p>
        <h3>Key VCF fields to understand</h3>
        <table><tr><th>Field</th><th>Meaning</th><th>Why it matters</th></tr>
          <tr><td>FILTER</td><td>PASS or reason for failure</td><td>Only PASS variants go forward</td></tr>
          <tr><td>AF (Allele Fraction)</td><td>% of reads supporting the alt allele</td><td>Low AF (&lt;5%) = subclonal or artifact</td></tr>
          <tr><td>DP (Depth)</td><td>Total reads at position</td><td>Low depth → less confidence</td></tr>
          <tr><td>TLOD</td><td>Tumor log-odds score</td><td>Mutect2 confidence metric</td></tr>
        </table>
        <h3>Functional annotation with VEP</h3>
        <p>Ensembl VEP (Variant Effect Predictor) adds biological context to each variant:</p>
        <ul>
          <li><strong>Consequence:</strong> missense_variant, stop_gained, frameshift_variant, splice_acceptor_variant...</li>
          <li><strong>SIFT / PolyPhen-2:</strong> Computational prediction of whether missense mutation disrupts protein function</li>
          <li><strong>ClinVar significance:</strong> Pathogenic / likely pathogenic / VUS / benign</li>
          <li><strong>COSMIC census:</strong> Is this a known cancer hotspot?</li>
          <li><strong>gnomAD AF:</strong> How common is this in the general population?</li>
        </ul>
        <div class="info-box">🔑 <strong>Tier 1 drivers</strong> (actionable mutations) typically require: (1) PASS filter, (2) AF >5%, (3) predicted deleterious function, (4) absent or rare in gnomAD, (5) present in COSMIC or ClinVar as pathogenic.</div>`,
      quiz: { question: 'Why is tumor-normal paired sequencing the gold standard for somatic variant calling?', options: ['Normal tissue DNA is used to repair the tumor genome', 'Comparing tumor to matched normal filters out the patient\'s germline variants, revealing only somatic mutations', 'Normal tissue sequencing provides higher coverage', 'Normal tissue confirms the cancer diagnosis histologically'], correct: 1, exp: 'By sequencing matched normal (blood/germline) alongside tumor, somatic variant callers subtract all germline variants — leaving only mutations acquired in the tumor. Without this, germline variants and population SNPs contaminate the mutation list with false positives.' }
    },

    {
      id: 'a1', title: 'Somatic vs Germline Variants', xp: 200, icon: '🧬',
      tags: ['germline', 'somatic', 'hereditary', 'genetic-counseling'],
      preview: ['How labs distinguish somatic from germline mutations', 'Clinical significance of germline cancer predisposition genes', 'Variant classification: pathogenic, VUS, benign'],
      content: `
        <h3>Why the distinction matters clinically</h3>
        <p>A <strong>somatic</strong> mutation exists only in the tumor and affects treatment decisions (which targeted therapy to use). A <strong>germline</strong> mutation is in every cell of the body, affects cancer risk for relatives, and triggers genetic counseling, surveillance protocols, and preventive surgery decisions.</p>
        <h3>How labs distinguish somatic from germline</h3>
        <table><tr><th>Approach</th><th>Method</th><th>Limitation</th></tr>
          <tr><td>Tumor-Normal paired sequencing</td><td>Mutation absent in normal = somatic; present in both = germline</td><td>Requires normal tissue</td></tr>
          <tr><td>Allele fraction analysis</td><td>Germline het variants: ~50% AF; somatic: variable</td><td>LOH can change germline AF</td></tr>
          <tr><td>Population databases</td><td>Variants in gnomAD at >1% likely germline</td><td>Misses rare germline variants</td></tr>
          <tr><td>Orthogonal germline testing</td><td>Dedicated germline panel from blood</td><td>Additional cost and time</td></tr>
        </table>
        <h3>Major cancer predisposition genes</h3>
        <table><tr><th>Gene</th><th>Syndrome</th><th>Cancers</th><th>Surveillance</th></tr>
          <tr><td>BRCA1/2</td><td>Hereditary Breast/Ovarian Cancer</td><td>Breast, ovarian, pancreatic</td><td>Annual MRI + mammography from 25; consider RRSO at 35-40</td></tr>
          <tr><td>MLH1/MSH2/MSH6/PMS2</td><td>Lynch Syndrome</td><td>Colorectal, endometrial, ovarian, gastric</td><td>Annual colonoscopy from 25</td></tr>
          <tr><td>APC</td><td>Familial Adenomatous Polyposis (FAP)</td><td>Colorectal (100% if untreated)</td><td>Annual sigmoidoscopy from 10-12; prophylactic colectomy</td></tr>
          <tr><td>TP53</td><td>Li-Fraumeni Syndrome</td><td>Sarcoma, brain, adrenal, breast, leukemia</td><td>Annual whole-body MRI from birth</td></tr>
          <tr><td>PTEN</td><td>Cowden Syndrome</td><td>Breast, thyroid, endometrial</td><td>Annual breast MRI + mammography</td></tr>
          <tr><td>RB1</td><td>Hereditary Retinoblastoma</td><td>Retinoblastoma, osteosarcoma</td><td>Eye exams every 2-3 months in infancy</td></tr>
          <tr><td>STK11</td><td>Peutz-Jeghers Syndrome</td><td>GI, breast, pancreatic, cervical</td><td>Upper/lower endoscopy every 2-3 years from 8</td></tr>
        </table>
        <h3>Variant classification (ACMG criteria)</h3>
        <p>The American College of Medical Genetics (ACMG) classifies variants into 5 tiers using evidence from functional studies, population frequency, computational prediction, and segregation data:</p>
        <table><tr><th>Class</th><th>Meaning</th><th>Clinical action</th></tr>
          <tr><td><strong>Pathogenic (P)</strong></td><td>Strong evidence of disease-causing</td><td>Trigger counseling, surveillance, risk-reducing procedures</td></tr>
          <tr><td><strong>Likely Pathogenic (LP)</strong></td><td>>90% probability of pathogenic</td><td>Treat as pathogenic in clinical decisions</td></tr>
          <tr><td><strong>VUS</strong></td><td>Variant of Uncertain Significance</td><td>Do not use for clinical decisions; recontact if reclassified</td></tr>
          <tr><td><strong>Likely Benign (LB)</strong></td><td>Probably not disease-causing</td><td>No action</td></tr>
          <tr><td><strong>Benign (B)</strong></td><td>Not disease-causing</td><td>No action</td></tr>
        </table>
        <div class="info-box">⚠️ <strong>VUS is the most difficult classification.</strong> With increasing use of large panel testing, labs report many VUSes — and patients/physicians must resist acting on them (they may be reclassified as benign). Variant reclassification databases (ClinVar) are continuously updated as evidence accumulates.</div>`,
      quiz: { question: 'A patient\'s tumor has a BRCA2 variant with ~48% allele fraction in normal blood tissue. What does this suggest?', options: ['This is a somatic mutation acquired during cancer development', 'This is likely a germline (inherited) heterozygous BRCA2 mutation', 'This is an artifact from contamination', 'The patient has a BRCA2 gene amplification'], correct: 1, exp: 'A ~50% allele fraction in normal (non-cancer) blood tissue indicates heterozygosity at the germline level — meaning one of the patient\'s two BRCA2 alleles carries this variant in every cell, consistent with an inherited (germline) mutation.' }
    },

    {
      id: 'a2', title: 'Copy Number Variation Analysis', xp: 210, icon: '📈',
      tags: ['CNV', 'amplification', 'deletion', 'bioinformatics'],
      preview: ['What copy number variations are and how they drive cancer', 'Tools for CNV detection: GATK CNV, CNVkit, FACETS', 'Interpreting purity and ploidy in tumor samples'],
      content: `
        <h3>Tumors rearrange their genomes</h3>
        <p>Cancer cells don't just acquire point mutations — they also amplify (extra copies) or delete regions of chromosomes. <strong>Copy number variations (CNVs)</strong> are among the most impactful genomic events in cancer, directly increasing oncogene dosage or eliminating tumor suppressors.</p>
        <h3>Types of copy number events</h3>
        <table><tr><th>Event</th><th>Definition</th><th>Cancer examples</th></tr>
          <tr><td><strong>Amplification</strong></td><td>Many extra copies (often >6 copies, sometimes hundreds)</td><td>HER2 amp (breast), MYC amp (neuroblastoma), EGFR amp (GBM)</td></tr>
          <tr><td><strong>Gain</strong></td><td>1-2 extra copies</td><td>Common across cancer types</td></tr>
          <tr><td><strong>Loss</strong></td><td>One copy deleted (hemizygous)</td><td>CDKN2A del (many types), RB1 del</td></tr>
          <tr><td><strong>Homozygous deletion</strong></td><td>Both copies gone</td><td>CDKN2A homozygous del, PTEN del</td></tr>
          <tr><td><strong>LOH</strong></td><td>Loss of heterozygosity — one allele lost but copy number may appear normal</td><td>TP53, RB1 (Knudson 2nd hit)</td></tr>
        </table>
        <h3>How CNVs are detected from sequencing</h3>
        <p>CNV callers work by measuring <strong>read depth</strong> — regions with 4 copies of DNA attract ~2x as many sequencing reads as diploid (2-copy) regions:</p>
        <ol>
          <li>Divide genome into bins (500 bp – 1 kb)</li>
          <li>Count reads per bin → normalize for GC content and mappability biases</li>
          <li>Segment bins with similar copy numbers (circular binary segmentation algorithm)</li>
          <li>Correct for tumor purity (fraction of reads that are actually from tumor cells)</li>
          <li>Assign integer copy number states (0, 1, 2, 3, 4+)</li>
        </ol>
        <p><strong>Tools:</strong> GATK CNV, CNVkit, FACETS (allele-specific), PURPLE (purity + ploidy)</p>
        <h3>Tumor purity and ploidy: the critical context</h3>
        <p>A tumor biopsy is never pure cancer — it's a mixture of tumor cells and normal stromal/immune cells. <strong>Purity</strong> = fraction of cells that are tumor.</p>
        <ul>
          <li>Low purity (20%) → CNV signals are diluted by normal cells → amplifications appear as modest gains</li>
          <li>Whole genome doubling (WGD) is common in cancer — the entire genome is doubled, making what looks like a "normal" 2-copy region actually 4 copies (tetraploid)</li>
        </ul>
        <p><strong>FACETS</strong> and <strong>PURPLE</strong> use B-allele frequencies (heterozygosity of germline SNPs) alongside depth to jointly estimate purity and ploidy — essential for correct CNV interpretation.</p>
        <h3>Clinically actionable CNVs</h3>
        <table><tr><th>Alteration</th><th>Cancer type</th><th>Clinical implication</th></tr>
          <tr><td>HER2 amplification</td><td>Breast, gastric</td><td>HER2-targeted therapy (trastuzumab, T-DXd)</td></tr>
          <tr><td>EGFR amplification</td><td>GBM, lung</td><td>EGFR-targeted therapy context</td></tr>
          <tr><td>FGFR1/2 amplification</td><td>Breast, gastric</td><td>FGFR inhibitor potential</td></tr>
          <tr><td>CCND1 amplification</td><td>Breast, head/neck</td><td>CDK4/6 inhibitor rationale</td></tr>
          <tr><td>MDM2 amplification</td><td>Liposarcoma, GBM</td><td>MDM2 inhibitor trials (navtemadlin)</td></tr>
          <tr><td>CDKN2A homozygous del</td><td>GBM, mesothelioma</td><td>CDK4/6 pathway dependence</td></tr>
        </table>`,
      quiz: { question: 'A tumor sample has 20% purity (80% normal cell contamination). What challenge does this create for CNV analysis?', options: ['The sequencer cannot read DNA from mixed samples', 'CNV signals from tumor cells are diluted by normal cell reads, making amplifications appear as subtle gains rather than dramatic spikes', 'Normal cells have no copy numbers to measure', 'Low purity only affects SNV calling, not CNV analysis'], correct: 1, exp: 'In a 20%-purity sample, 80% of reads come from diploid normal cells. An amplified gene (e.g., 8 copies in tumor) will appear as approximately (0.2×8 + 0.8×2) = 3.2 copies — easy to miss without purity correction. Tools like FACETS estimate purity using B-allele frequencies to adjust copy number calls.' }
    },

    {
      id: 'a3', title: 'Tumor Mutational Burden: Deep Dive', xp: 210, icon: '⚖',
      tags: ['TMB', 'immunotherapy', 'NGS', 'biomarkers'],
      preview: ['How TMB is calculated from sequencing data', 'Panel-based vs whole-exome TMB: concordance issues', 'TMB as a predictive vs prognostic biomarker'],
      content: `
        <h3>TMB calculation: the mechanics</h3>
        <p>Tumor Mutational Burden is defined as the number of somatic mutations per megabase (Mb) of coding genome sequenced. The formula:</p>
        <div style="font-family:monospace;background:#0f172a;padding:1rem;border-radius:6px;margin:1rem 0;border-left:3px solid #00d4ff;">TMB = (# of qualifying somatic mutations) / (# of Mb covered at sufficient depth)</div>
        <p><strong>Qualifying mutations</strong> typically include: synonymous + nonsynonymous coding variants that are somatic (absent in paired normal or population databases), AF > 5%, depth ≥ 50x. Some platforms exclude synonymous mutations to focus on protein-altering events, but the FDA-approved companion diagnostic (FoundationOne CDx) includes synonymous mutations as they correlate with overall mutational burden.</p>
        <h3>Whole exome vs targeted panel TMB</h3>
        <p>The reference standard is <strong>whole exome sequencing (WES) TMB</strong> (~30 Mb of coding genome). But clinical testing uses targeted gene panels (0.5–1.5 Mb) because WES is expensive.</p>
        <table><tr><th>Method</th><th>Coverage</th><th>Reliability</th><th>Cost</th></tr>
          <tr><td>WES TMB</td><td>~30 Mb</td><td>High (reference)</td><td>High</td></tr>
          <tr><td>Large panel (FoundationOne ~1.1 Mb)</td><td>~1.1 Mb</td><td>Good concordance with WES (r > 0.9)</td><td>Medium</td></tr>
          <tr><td>Small panel (&lt;0.5 Mb)</td><td>&lt;0.5 Mb</td><td>High variance — not reliable for TMB</td><td>Low</td></tr>
        </table>
        <p><strong>Harmonization challenge:</strong> Different panels report TMB differently, making cross-platform comparison difficult. The ESMO Scale for Clinical Actionability and the Friends of Cancer Research consortium have worked on TMB harmonization standards.</p>
        <h3>Predictive vs prognostic biomarker</h3>
        <table><tr><th>Biomarker type</th><th>Definition</th><th>TMB context</th></tr>
          <tr><td><strong>Predictive</strong></td><td>Predicts response to a specific treatment</td><td>High TMB predicts better response to checkpoint inhibitors</td></tr>
          <tr><td><strong>Prognostic</strong></td><td>Predicts overall outcome regardless of treatment</td><td>Conflicting data — in some cancers, high TMB is paradoxically good (immune clearing) or bad (genomic instability)</td></tr>
        </table>
        <h3>Tumors with exceptional TMB</h3>
        <p><strong>POLE/POLD1 exonuclease domain mutations</strong> cause ultramutator phenotypes (100–1000+ mut/Mb) — 10–100x higher than MSI-H tumors. The proofreading exonuclease domain of DNA polymerase ε (POLE) normally corrects replication errors; its loss causes a C>A transversion-dominated hypermutation signature.</p>
        <p>POLE-mutant tumors (3-10% of endometrial and colorectal cancers) have exceptional immunotherapy responses, even beyond what would be predicted by their TMB alone, possibly due to neoantigen quality differences.</p>
        <h3>Limitations of TMB as a sole biomarker</h3>
        <ul>
          <li>TMB-High does not guarantee IO response (especially in KRAS-mutant NSCLC)</li>
          <li>Tumor immune microenvironment (T cell infiltration, PD-L1 expression) also matters</li>
          <li>STK11 co-mutations in KRAS-mutant NSCLC create an immunologically "cold" tumor despite high TMB</li>
          <li>HMB (high mutational burden) and HLA diversity also affect neoantigen presentation</li>
        </ul>`,
      quiz: { question: 'A targeted gene panel covers 0.4 Mb and finds 2 somatic mutations. It reports TMB = 5 mut/Mb. Why might this value be unreliable?', options: ['The panel should cover at least 30 Mb for accurate TMB', 'A 0.4 Mb panel is too small — statistical variance is high when very few mutations are detected, making the TMB estimate noisy', 'Targeted panels cannot detect somatic mutations', 'TMB should only be measured in blood, not tumor tissue'], correct: 1, exp: 'Small panels covering &lt;0.5 Mb detect very few mutations per sample, making TMB estimates highly variable. If you detect 2 mutations in 0.4 Mb = 5 mut/Mb; if 3 mutations = 7.5 mut/Mb. This sampling noise makes small-panel TMB unreliable for clinical decisions. Panels of at least 1 Mb are recommended for TMB.' }
    },

    {
      id: 'a4', title: 'Machine Learning in Oncogenomics', xp: 220, icon: '🤖',
      tags: ['machine-learning', 'AI', 'deep-learning', 'bioinformatics'],
      preview: ['How ML is used to classify tumors and predict drug response', 'Challenges: batch effects, interpretability, small sample sizes', 'Foundation models and what\'s next in AI oncology'],
      content: `
        <h3>Machine learning enters the clinic</h3>
        <p>Cancer genomics generates petabytes of data — far more than any human can analyze manually. Machine learning (ML) and deep learning models are being used to find patterns, classify tumors, predict outcomes, and discover new drug targets.</p>
        <h3>Key ML applications in oncogenomics</h3>
        <table><tr><th>Application</th><th>Approach</th><th>Example</th></tr>
          <tr><td>Tumor subtype classification</td><td>Supervised classification (SVM, random forest, DNN)</td><td>PAM50 classifier for breast cancer intrinsic subtypes; methylation-based CNS tumor classifier</td></tr>
          <tr><td>Survival prediction</td><td>Cox regression, DeepSurv, random survival forests</td><td>Predicting PFS/OS from multiomics features</td></tr>
          <tr><td>Drug response prediction</td><td>Graph neural networks, multi-task DNN</td><td>CCLE, GDSC cell line drug response prediction</td></tr>
          <tr><td>Neoantigen prediction</td><td>Sequence models, binding affinity predictors (netMHCpan)</td><td>Predicting which mutations create immunogenic peptides for personalized vaccines</td></tr>
          <tr><td>Mutational signature decomposition</td><td>NMF (non-negative matrix factorization)</td><td>SigProfiler, MuSiCa</td></tr>
          <tr><td>Pathology image analysis</td><td>CNNs on H&E slides</td><td>Detecting EGFR/KRAS mutations from histology (TCGA-based training)</td></tr>
        </table>
        <h3>Challenges specific to genomics ML</h3>
        <p><strong>Small sample sizes with high dimensionality:</strong> Cancer datasets often have hundreds to low thousands of patients with millions of genomic features. This causes overfitting. Solutions: feature selection, regularization (LASSO, elastic net), transfer learning.</p>
        <p><strong>Batch effects:</strong> Genomic data from different sequencing centers, platforms, or time points have systematic technical differences that can mimic biological signals. Must be corrected with tools like ComBat, Harmony, or careful normalization before training.</p>
        <p><strong>Class imbalance:</strong> Rare cancer subtypes may have 10 cases vs 1000 of the common type. Solutions: SMOTE, class-weighted loss functions, few-shot learning.</p>
        <p><strong>Interpretability:</strong> Clinical decisions require explainability. Black-box deep learning needs SHAP values, attention maps, or intrinsically interpretable models to be actionable.</p>
        <h3>Foundation models in biology</h3>
        <p>Inspired by LLMs (GPT, etc.), large pre-trained models are being applied to genomics:</p>
        <ul>
          <li><strong>Nucleotide Transformer / DNABERT:</strong> Pre-trained on DNA sequences; fine-tuned for regulatory region prediction, splice site detection</li>
          <li><strong>scGPT / Geneformer:</strong> Pre-trained on millions of single-cell RNA-seq profiles; captures gene–gene relationships for cell type annotation and perturbation prediction</li>
          <li><strong>ESM-2 / AlphaFold:</strong> Protein language/structure models; predict the effect of mutations on protein stability and function</li>
          <li><strong>REMEDIS / Med-PaLM:</strong> Multimodal foundation models combining imaging + genomics + clinical notes</li>
        </ul>
        <div class="info-box">🚀 <strong>What's next:</strong> Multi-modal AI integrating tumor DNA mutations + RNA expression + protein levels + pathology images + patient history into unified predictions for treatment response. The goal: truly personalized oncology — the right drug, for the right patient, at the right time.</div>
        <h3>Practical workflow: tumor subtype classifier</h3>
        <p>A typical supervised learning workflow for classifying cancer subtypes from RNA-seq data:</p>
        <ol>
          <li>Collect labeled data (e.g., TCGA BRCA: 1000 samples with known PAM50 subtype)</li>
          <li>Feature engineering: variance-stabilizing normalization, select top 5000 most variable genes</li>
          <li>Split: 80% train, 10% validation, 10% holdout test</li>
          <li>Train classifier: random forest or gradient boosting with cross-validation to tune hyperparameters</li>
          <li>Evaluate: accuracy, macro-F1, confusion matrix across subtypes</li>
          <li>Interpret: feature importance → which genes drive classification? Do they match known biology?</li>
          <li>Validate on external cohort (e.g., METABRIC) to test generalization</li>
        </ol>`,
      quiz: { question: 'Why is "batch effect" a major challenge in training ML models on genomics data?', options: ['Batch processing slows down model training significantly', 'Systematic technical differences between sequencing runs mimic biological signals, causing models to learn artifacts instead of true biology', 'Batch normalization layers are incompatible with genomic data types', 'Patient batches in clinical trials are too small for ML training'], correct: 1, exp: 'Batch effects are systematic non-biological differences introduced by sequencing center, platform, library prep protocol, or date. An ML model trained without batch correction may learn to distinguish "Batch A from Hospital X" from "Batch B from Hospital Y" rather than learning true cancer subtypes — performing poorly on new data.' }
    },
  ],
};

// Flat lookup map by lesson ID
const LESSON_BY_ID = {};
Object.values(LESSON_DB).forEach(path => path.forEach(l => { LESSON_BY_ID[l.id] = l; }));

// Path metadata
const PATH_META = {
  beginner:     { label: 'Beginner',     color: '#10b981', icon: '🟢', description: 'DNA basics to cancer fundamentals — no prior knowledge needed.' },
  intermediate: { label: 'Intermediate', color: '#f59e0b', icon: '🟡', description: 'Real cancer genomics: subtypes, pathways, biomarkers.' },
  advanced:     { label: 'Advanced',     color: '#ef4444', icon: '🔴', description: 'Computational analysis, variant calling, and ML in oncology.' },
};
