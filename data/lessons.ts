import type { Lesson } from '@/lib/types';

export const BEGINNER_LESSONS: Lesson[] = [
  {
    id: 'b0', title: 'Welcome to Cancer Genomics', icon: '🎯', duration: '8 min', free: true, xp: 50, section: 'Introduction',
    content: `<h3>What is cancer genomics?</h3>
<p>Cancer is fundamentally a <strong>disease of the genome</strong>. Every cancer begins with changes in DNA — mutations that alter how cells grow, divide, and die. Cancer genomics is the study of these genetic changes: which genes are mutated, how they interact, and how we can use this information to diagnose and treat cancer more precisely.</p>
<div style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:var(--accent);margin-bottom:0.4rem">🎯 The Core Insight</div>
  <p>Cancer is not random. It follows specific genetic rules. When you understand those rules, you can predict which cancers will respond to which drugs — and why. This is the promise of precision oncology.</p>
</div>
<h3>Why does this matter?</h3>
<p>Before genomics, oncologists classified cancer by where it started: lung cancer, breast cancer, colon cancer. Today we know that two breast cancers can be as genetically different from each other as breast cancer is from lung cancer — and that a lung cancer with an EGFR mutation responds to completely different drugs than a lung cancer with a KRAS mutation.</p>
<p>Understanding the genome is the key to understanding why cancers behave differently, why some patients respond to treatment while others don't, and how to design better therapies.</p>
<h3>What you'll learn in this path</h3>
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.5rem;margin-top:0.75rem">
  <li>🧬 How DNA, genes, and mutations work</li>
  <li>🚀 Oncogenes — the cancer accelerators</li>
  <li>🛑 Tumor suppressors — the brakes that fail</li>
  <li>🎯 How targeted therapies exploit genetic weaknesses</li>
  <li>📋 Reading real mutation reports</li>
</ul>`,
    quiz: { q: 'Cancer is fundamentally a disease of:', opts: ['The immune system', 'The genome (DNA)', 'Cell membranes', 'Mitochondria'], correct: 1, exp: 'Cancer originates from genetic changes — mutations in DNA that alter normal cell growth and death programs. Every cancer has a genetic basis, though environmental factors (smoking, UV, viruses) can cause those mutations.' },
    steps: [
      { type: 'hook', emoji: '🎯', stat: '1 in 2', label: 'people will be diagnosed with cancer in their lifetime — but only 5-10% of cases are purely hereditary', sub: 'The rest are driven by somatic mutations acquired during your lifetime. Understanding those mutations is how we fight back.', color: '#00d4ff' },
      { type: 'learn' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b1', title: 'DNA: The Master Blueprint', icon: '🧬', duration: '15 min', free: true, xp: 80, section: 'DNA & Genes',
    content: `<h3>The structure of DNA</h3>
<p>DNA (deoxyribonucleic acid) is a double-stranded molecule shaped like a <strong>twisted ladder</strong> — the famous double helix discovered by Watson and Crick in 1953. Each rung of the ladder is a <strong>base pair</strong>, and each side of the ladder is a sugar-phosphate backbone.</p>
<p>There are four bases: <strong>Adenine (A)</strong>, <strong>Thymine (T)</strong>, <strong>Guanine (G)</strong>, and <strong>Cytosine (C)</strong>. They pair specifically: A with T, and G with C. This complementary base pairing is the key to DNA replication and transcription.</p>
<div style="background:rgba(124,58,237,0.06);border:1px solid rgba(124,58,237,0.15);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:#a78bfa;margin-bottom:0.4rem">🔑 Key Rule: Base Pairing</div>
  <p style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem">A — T (2 hydrogen bonds) &nbsp;|&nbsp; G — C (3 hydrogen bonds)</p>
</div>
<h3>The human genome</h3>
<p>Your genome contains approximately <strong>3.2 billion base pairs</strong> organized into 23 pairs of chromosomes inside nearly every cell of your body. If you stretched it out, the DNA from a single cell would be about 2 meters long.</p>
<p>Within this vast sequence, only about 1.5% encodes the ~20,000 protein-coding genes. The rest includes regulatory elements, non-coding RNA genes, and sequences whose functions are still being discovered.</p>
<h3>Cancer and DNA damage</h3>
<p>Every day, your cells sustain thousands of DNA lesions from UV radiation, reactive oxygen species, and replication errors. Your cells have powerful repair systems that fix nearly all of them. When repair fails, a mutation persists — and over a lifetime, just the right combination of mutations can cause cancer.</p>`,
    quiz: { q: 'Which base pairs with Adenine in DNA?', opts: ['Guanine', 'Cytosine', 'Thymine', 'Uracil'], correct: 2, exp: 'Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds in DNA. Guanine pairs with Cytosine via 3 hydrogen bonds. In RNA, Uracil replaces Thymine — so in RNA, A pairs with U.' },
    steps: [
      { type: 'hook', emoji: '🧬', stat: '3.2 Billion', label: 'base pairs in every single cell of your body — right now', sub: 'If you stretched the DNA from one cell, it would be 2 meters long. Your body has ~37 trillion cells. That\'s enough DNA to reach the sun and back 300 times.', color: '#00d4ff' },
      { type: 'learn' },
      { type: 'game', gameId: 'basePairing', title: '🎮 Base Pairing Challenge', instructions: 'Match each DNA base to its correct partner. A pairs with T, G pairs with C. Complete all 4 rounds!' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b2', title: 'Genes, Proteins & Instructions', icon: '🔧', duration: '18 min', free: true, xp: 100, section: 'DNA & Genes',
    content: `<h3>The central dogma</h3>
<p>The most important principle in molecular biology: genetic information flows <strong>DNA → RNA → Protein</strong>. This is how genes produce the molecules that actually do the work in your cells.</p>
<h3>Step 1: Transcription (DNA → RNA)</h3>
<p>RNA polymerase reads a DNA template and produces a complementary strand of <strong>messenger RNA (mRNA)</strong>. The mRNA is a photocopy of the gene that can leave the nucleus.</p>
<h3>Step 2: Translation (RNA → Protein)</h3>
<p>Ribosomes read mRNA in triplets called <strong>codons</strong>. Each codon specifies one amino acid. The ribosome strings amino acids together to build a protein. The sequence AUG is the universal start codon; UAA, UAG, and UGA are stop codons.</p>
<div style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:#f87171;margin-bottom:0.4rem">⚠️ Cancer Connection</div>
  <p>When a mutation changes the DNA sequence, it changes the protein. A single base change can create an overactive kinase, a truncated tumor suppressor, or a non-functional repair enzyme — this is how cancer starts.</p>
</div>`,
    quiz: { q: 'What is the correct order of the Central Dogma?', opts: ['Protein → RNA → DNA', 'RNA → DNA → Protein', 'DNA → RNA → Protein', 'DNA → Protein → RNA'], correct: 2, exp: "The Central Dogma: DNA is transcribed into RNA, which is translated into protein. This flow was established by Francis Crick in 1958." },
    steps: [
      { type: 'hook', emoji: '🔧', stat: '~20,000', label: 'genes produce over 100,000 distinct proteins through alternative splicing', sub: 'One gene, many proteins. The central dogma is the blueprint that transforms genetic instructions into the molecular workers running every process in your body.', color: '#7c3aed' },
      { type: 'learn' },
      { type: 'game', gameId: 'codonDecoder', title: '🧬 Codon Decoder', instructions: 'Translate each mRNA codon to its amino acid. AUG = Start, UAA/UAG/UGA = Stop. Know your 8 essential codons!' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b3', title: 'What is a Mutation?', icon: '⚡', duration: '22 min', free: true, xp: 120, section: 'DNA & Genes',
    content: `<h3>Types of mutations</h3>
<p>A mutation is any change in the DNA sequence. They fall into several categories:</p>
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.6rem;margin:0.75rem 0">
  <li><strong>🔵 Missense</strong> — One nucleotide change, different amino acid. Example: KRAS G12V (Glycine → Valine)</li>
  <li><strong>🔴 Nonsense</strong> — Creates a premature stop codon, truncating the protein. Example: BRCA1 5382insC</li>
  <li><strong>🟡 Frameshift</strong> — Insertion or deletion shifts the reading frame. All downstream codons change.</li>
  <li><strong>🟢 Silent</strong> — Nucleotide change that doesn't change the amino acid (codon degeneracy)</li>
  <li><strong>🟣 Splice site</strong> — Disrupts mRNA splicing, causing exon skipping or intron retention</li>
</ul>
<h3>Driver vs. passenger mutations</h3>
<p><strong>Driver mutations</strong> directly contribute to cancer growth — they give cells a proliferative or survival advantage. <strong>Passenger mutations</strong> accumulate from the same mutational processes but don't help the tumor. In a typical cancer, there may be 2-8 driver mutations among thousands of passenger mutations.</p>
<div style="background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:#f59e0b;margin-bottom:0.4rem">🔑 Key Insight</div>
  <p>Finding the driver mutations is the whole game of precision oncology. If you can identify which mutation is driving growth, you can target it with a specific drug.</p>
</div>`,
    quiz: { q: 'A mutation changes one amino acid to a different amino acid. What type is this?', opts: ['Frameshift', 'Splice site', 'Missense', 'Nonsense'], correct: 2, exp: 'A missense mutation is a single nucleotide change resulting in a different amino acid. The most famous example is BRAF V600E (Valine→Glutamic acid) in melanoma.' },
    steps: [
      { type: 'hook', emoji: '⚡', stat: '10,000+', label: 'DNA lesions occur in each of your cells — every single day', sub: 'Your repair machinery fixes nearly all of them. The rare ones that slip through become mutations. Over decades, just the right combination can cause cancer.', color: '#f59e0b' },
      { type: 'learn' },
      { type: 'game', gameId: 'mutSpotter', title: '🔬 Mutation Spotter', instructions: 'Compare normal and mutant DNA sequences. Identify what type of mutation occurred. 4 rounds!' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b4', title: 'Oncogenes: The Accelerators', icon: '🚀', duration: '25 min', free: true, xp: 150, section: 'Cancer Genes',
    content: `<h3>What are proto-oncogenes?</h3>
<p>Every cell carries genes called <strong>proto-oncogenes</strong>. These are normal, essential genes that control cell growth, division, and differentiation — the accelerators of cellular activity. Examples: EGFR (detects growth factors), KRAS (relays growth signals), MYC (controls gene expression).</p>
<div style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:#f87171;margin-bottom:0.4rem">🚗 Analogy: The Gas Pedal</div>
  <p>A proto-oncogene is the gas pedal. Pressed appropriately, the car moves at the right speed. An oncogene mutation is the gas pedal <strong>stuck to the floor</strong> — the cell accelerates regardless of signals, ignoring all red lights and guardrails.</p>
</div>
<h3>KRAS: The most mutated oncogene</h3>
<p><strong>KRAS</strong> is mutated in 28% of all human cancers — virtually every pancreatic cancer, and large fractions of lung, colon, and other cancers. Normally KRAS cycles between active (GTP-bound) and inactive (GDP-bound) states. Mutations like G12D and G12C block GTPase activity, locking KRAS permanently ON.</p>
<p>KRAS was considered "undruggable" for 40 years — until Sotorasib was approved in 2021 for KRAS G12C-mutant lung cancer, a landmark in oncology.</p>`,
    quiz: { q: 'What happens when a proto-oncogene becomes an oncogene?', opts: ['It becomes permanently inactive', 'It is constitutively active — stuck ON', 'It moves to a different chromosome', 'It produces a shorter protein'], correct: 1, exp: 'Oncogene mutations make the gene product constitutively active — permanently "on" without needing an external growth signal. KRAS G12D, BRAF V600E, and EGFR L858R are all constitutively active.' },
    steps: [
      { type: 'hook', emoji: '🚀', stat: '25%', label: 'of ALL human cancers carry a KRAS mutation', sub: "That's 1 in 4 cancers. KRAS was considered 'undruggable' for 40 years — until Sotorasib changed everything in 2021. Understanding why requires understanding oncogenes.", color: '#ef4444' },
      { type: 'learn' },
      { type: 'game', gameId: 'krasToggle', title: '⚙️ KRAS: Normal vs Mutant', instructions: 'Toggle between normal and mutant KRAS. See how a single amino acid change permanently activates the entire proliferation cascade.' },
      { type: 'game', gameId: 'drugMatch', title: '💊 Drug-Target Match', instructions: 'Match each targeted therapy to the gene it inhibits. Click a drug, then its target to match all 5 pairs.' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b5', title: 'Tumor Suppressors: The Brakes', icon: '🛑', duration: '28 min', free: true, xp: 150, section: 'Cancer Genes',
    content: `<h3>What are tumor suppressors?</h3>
<p>Tumor suppressor genes normally prevent cells from growing or dividing too fast. They are the brakes, quality-control checkpoints, and repair crews of the cell. The two most important: <strong>TP53</strong> (mutated in >50% of cancers) and <strong>RB1</strong> (the original Knudson two-hit gene).</p>
<h3>The Two-Hit Hypothesis</h3>
<p>Alfred Knudson (1971) explained how tumor suppressors are inactivated. Because you have <strong>two copies</strong> of most genes, <em>both</em> copies must be inactivated for the cancer-suppressing function to be lost:</p>
<ul style="list-style:none;padding:0;margin:0.75rem 0;display:flex;flex-direction:column;gap:0.5rem">
  <li><strong>First hit</strong>: One copy inactivated (mutation, deletion, methylation)</li>
  <li><strong>Second hit</strong>: Remaining copy also inactivated (LOH — loss of heterozygosity)</li>
</ul>
<p>In hereditary cancers (BRCA1-associated), patients are born with one damaged copy — so only one more hit is needed in any cell.</p>
<h3>TP53 — Guardian of the Genome</h3>
<p>When DNA is damaged, TP53 does one of two things: <strong>pause the cell cycle</strong> (via p21) to allow repair, or <strong>trigger apoptosis</strong> (via PUMA/BAX) if damage is irreparable. When TP53 is mutated, cells with damaged DNA survive and keep dividing — accumulating more mutations.</p>`,
    quiz: { q: 'The Two-Hit Hypothesis states that tumor suppressors require:', opts: ['One mutation in one copy', 'Inactivation of BOTH copies', 'Overexpression of the gene', 'A frameshift mutation only'], correct: 1, exp: "Knudson's Two-Hit Hypothesis: both copies of a tumor suppressor must be inactivated. In hereditary cancer, patients inherit one inactivated copy (first hit) — only one more somatic event is needed." },
    steps: [
      { type: 'hook', emoji: '🛑', stat: '50%+', label: 'of all human cancers have lost TP53 — the Guardian of the Genome', sub: 'When TP53 fails, cells with damaged DNA survive and keep dividing. Understanding why takes just 2 clicks.', color: '#3b82f6' },
      { type: 'learn' },
      { type: 'game', gameId: 'twoHit', title: '🎮 The Two-Hit Hypothesis', instructions: 'TP53 requires BOTH copies to be lost before protection fails. Click each gene copy to mutate it and see what happens.' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b6', title: 'The Hallmarks of Cancer', icon: '🎯', duration: '30 min', free: true, xp: 180, section: 'Cancer Biology',
    content: `<h3>What makes a cancer cell a cancer cell?</h3>
<p>In 2000 (updated 2011), Hanahan & Weinberg published "The Hallmarks of Cancer" — describing the <strong>10 core capabilities</strong> all cancers acquire:</p>
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.5rem;margin:0.75rem 0">
  <li>🔴 Sustaining proliferative signaling (KRAS, EGFR, HER2)</li>
  <li>🔴 Evading growth suppressors (TP53, RB1, PTEN)</li>
  <li>🔴 Resisting cell death (BCL-2, MCL-1)</li>
  <li>🔴 Enabling replicative immortality (TERT — telomerase)</li>
  <li>🔴 Inducing angiogenesis (VEGF, HIF-1α)</li>
  <li>🔴 Activating invasion and metastasis (MMP, E-cadherin loss)</li>
  <li>🟡 Reprogramming energy metabolism (Warburg effect — aerobic glycolysis)</li>
  <li>🟡 Evading immune destruction (PD-L1, IDO)</li>
  <li>🟡 Tumor-promoting inflammation (NF-κB, cytokines)</li>
  <li>🟡 Genome instability and mutation (MMR, HR deficiency)</li>
</ul>
<div style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:#10b981;margin-bottom:0.4rem">💊 Clinical Impact</div>
  <p>Each hallmark represents a therapeutic target. Checkpoint inhibitors target immune evasion. Anti-VEGF drugs target angiogenesis. CDK4/6 inhibitors target proliferation. Understanding hallmarks is understanding the logic behind every cancer drug.</p>
</div>`,
    quiz: { q: 'Which is NOT one of the original Hallmarks of Cancer?', opts: ['Sustaining proliferative signaling', 'Evading growth suppressors', 'Inducing angiogenesis', 'Amplifying MYC'], correct: 3, exp: 'MYC amplification is a mechanism by which cancers sustain proliferative signaling — but it is not itself a hallmark. The hallmarks are capabilities acquired by cancer cells, not specific genetic events.' },
    steps: [
      { type: 'hook', emoji: '🎯', stat: '10', label: 'hallmarks that all cancers must acquire — and each is a potential drug target', sub: "Hanahan & Weinberg's 2000 paper transformed oncology by showing cancer follows rules. Every hallmark became a therapeutic battleground.", color: '#f472b6' },
      { type: 'learn' },
      { type: 'game', gameId: 'hallmarks', title: '🎯 Hallmarks Explorer', instructions: 'Click each hallmark to reveal the genetic driver and approved therapy targeting it. Find all 10!' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b7', title: 'Immunotherapy: Unleashing the Immune System', icon: '⚔️', duration: '25 min', free: true, xp: 160, section: 'Treatment',
    content: `<h3>How cancer evades the immune system</h3>
<p>Your immune system can recognize and kill cancer cells — but tumors evolve to evade detection. The key mechanism: cancer cells overexpress <strong>PD-L1</strong>, which binds to <strong>PD-1</strong> on T-cells, sending an "inhibitory signal" that turns them off.</p>
<h3>Checkpoint inhibitors</h3>
<p>Checkpoint inhibitors block the PD-1/PD-L1 interaction, releasing the "brakes" on T-cells:</p>
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.5rem;margin:0.75rem 0">
  <li>💊 <strong>Pembrolizumab (Keytruda)</strong> — anti-PD-1; most widely approved checkpoint inhibitor</li>
  <li>💊 <strong>Nivolumab (Opdivo)</strong> — anti-PD-1; approved for melanoma, NSCLC, kidney cancer</li>
  <li>💊 <strong>Atezolizumab</strong> — anti-PD-L1; approved for bladder cancer, NSCLC</li>
  <li>💊 <strong>Ipilimumab</strong> — anti-CTLA-4; blocks a different immune checkpoint</li>
</ul>
<h3>Who responds to immunotherapy?</h3>
<p>Response predictors include <strong>TMB (tumor mutational burden)</strong> — high TMB means more neoantigens, more T-cell recognition. <strong>MSI-H</strong> status (mismatch repair deficiency) is the strongest predictor — Dostarlimab produced 100% complete responses in MSI-H rectal cancer in 2022.</p>`,
    quiz: { q: 'Checkpoint inhibitors work by:', opts: ['Blocking DNA replication', 'Releasing the "brakes" on T-cells to attack cancer', 'Killing cancer cells directly with radiation', 'Blocking blood vessel growth'], correct: 1, exp: 'Checkpoint inhibitors (PD-1/PD-L1 and CTLA-4 blockers) release the inhibitory signals that tumors use to suppress T-cells, allowing the immune system to recognize and kill cancer cells.' },
    steps: [
      { type: 'hook', emoji: '⚔️', stat: '100%', label: 'complete response rate — achieved by Dostarlimab in MSI-H rectal cancer (NEJM 2022)', sub: "For the first time in oncology history, every patient in a trial achieved complete remission without surgery or chemotherapy. This is what immunotherapy can do.", color: '#10b981' },
      { type: 'learn' },
      { type: 'game', gameId: 'immunoSim', title: '🛡️ Immune Checkpoint Simulator', instructions: 'Activate T-cells and direct them to kill cancer cells. Block PD-1/PD-L1 interactions to release the immune brake!' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b8', title: 'Reading a Mutation Report', icon: '📋', duration: '20 min', free: true, xp: 140, section: 'Clinical Skills',
    content: `<h3>What is NGS?</h3>
<p>Next-generation sequencing (NGS) tests like FoundationOne CDx, MSK-IMPACT, or Tempus xT simultaneously sequence hundreds of cancer-relevant genes from a tumor biopsy. The result is a <strong>mutation report</strong> — a list of alterations with clinical annotations.</p>
<h3>Key report elements</h3>
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.6rem;margin:0.75rem 0">
  <li><strong>Gene name + variant</strong>: KRAS G12C — the specific amino acid change</li>
  <li><strong>Allele frequency (AF)</strong>: % of reads carrying the mutation. 40% AF ≈ clonal, dominant mutation</li>
  <li><strong>Copy number</strong>: Amplifications or deletions (ERBB2 amplification = HER2+)</li>
  <li><strong>Fusions</strong>: EML4-ALK, RET fusion — often highly targetable</li>
  <li><strong>TMB</strong>: Mutations per megabase. High TMB (>10 mut/Mb) predicts immunotherapy response</li>
  <li><strong>MSI status</strong>: MSI-H = mismatch repair deficient = immunotherapy candidate</li>
</ul>`,
    quiz: { q: 'A report shows KRAS G12C with 40% allele frequency. This means:', opts: ['40% of the gene is normal', 'About 40% of tumor cells carry KRAS G12C', '40% chance of treatment response', 'KRAS is amplified 40 times'], correct: 1, exp: 'Allele frequency indicates what % of sequenced DNA reads carry the variant. 40% AF in a tumor typically means this is a clonal, dominant driver mutation present in most tumor cells.' },
    steps: [
      { type: 'hook', emoji: '📋', stat: '1 Test', label: 'can identify 300+ actionable mutations from a single tumor biopsy', sub: 'Next-generation sequencing produces a mutation report oncologists use to choose targeted therapy. Learning to read it is a core skill in precision medicine.', color: '#10b981' },
      { type: 'learn' },
      { type: 'game', gameId: 'cancerProfiler', title: '🏥 Cancer Profiler', instructions: 'Given a real mutation profile, identify the most likely cancer type. 4 cases based on real clinical data.' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b9', title: 'Targeted Therapy: Precision Medicine', icon: '💊', duration: '22 min', free: true, xp: 160, section: 'Treatment',
    content: `<h3>From chemotherapy to targeted therapy</h3>
<p>Traditional chemotherapy attacks all rapidly dividing cells — effective but causes significant toxicity. Targeted therapies exploit specific genetic vulnerabilities in cancer cells, killing cancer while largely sparing normal tissue.</p>
<h3>The first targeted therapy: Imatinib</h3>
<p>BCR-ABL fusion (from the Philadelphia chromosome t(9;22)) creates a constitutively active kinase driving chronic myeloid leukemia. <strong>Imatinib</strong> was designed to fit precisely into the BCR-ABL ATP pocket, blocking its kinase activity. CML went from a disease with ~30% 5-year survival to >90%.</p>
<h3>PARP inhibitors and synthetic lethality</h3>
<p>BRCA1/2-mutant cancers rely on PARP for DNA repair because their homologous recombination is broken. PARP inhibitors like <strong>Olaparib</strong> block this backup pathway — BRCA-deficient cancer cells die while BRCA-intact normal cells survive. This is <strong>synthetic lethality</strong>: two individually tolerable defects that together are lethal.</p>
<div style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:var(--accent);margin-bottom:0.4rem">💡 Key Principle</div>
  <p>Every targeted therapy matches a drug to a specific genetic alteration. The mutation is the target; the drug is the key. Without the mutation, the drug won't help.</p>
</div>`,
    quiz: { q: 'Synthetic lethality means:', opts: ['Two drugs combined are lethal to cancer', 'Two genetic defects together kill cancer cells while sparing normal cells', 'A synthetic drug kills cancer', 'Lethally high doses of targeted therapy'], correct: 1, exp: "Synthetic lethality: two individually tolerable genetic defects that together are lethal. BRCA mutation + PARP inhibition = cell death. Normal cells with intact BRCA survive because they have an alternative repair pathway." },
    steps: [
      { type: 'hook', emoji: '💊', stat: '90%+', label: '5-year survival in CML after Imatinib — up from 30% before targeted therapy', sub: 'One drug. One target. One mutation. Imatinib proved that matching the right drug to the right genetic change can transform a fatal disease into a manageable condition.', color: '#00d4ff' },
      { type: 'learn' },
      { type: 'game', gameId: 'cascade', title: '⚡ Signal Cascade Explorer', instructions: 'Trace the RAS/MAPK proliferation signal from receptor to nucleus. Click each node to see how the signal flows.' },
      { type: 'quiz' },
    ],
  },
  {
    id: 'b10', title: 'Your First Genome Navigation', icon: '🗺️', duration: '15 min', free: true, xp: 120, section: 'Explorer',
    content: `<h3>Putting it all together</h3>
<p>You now understand the key players in cancer genomics. The GeneLens Explorer lets you see them all together — a living map of how oncogenes, tumor suppressors, and their signaling pathways connect and interact.</p>
<h3>How to read the explorer</h3>
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.5rem;margin:0.75rem 0">
  <li>🔴 <strong>Red nodes</strong> — Oncogenes (gain-of-function mutations drive cancer)</li>
  <li>🔵 <strong>Blue nodes</strong> — Tumor suppressors (loss-of-function mutations allow cancer)</li>
  <li>🟡 <strong>Yellow nodes</strong> — Kinases and signaling proteins</li>
  <li>➡️ <strong>Arrows with arrows</strong> — Activation signals</li>
  <li>⊣ <strong>Arrows with flat ends</strong> — Inhibition signals</li>
</ul>
<div style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0">
  <div style="font-weight:700;color:#10b981;margin-bottom:0.4rem">🚀 What's Next</div>
  <p>You've mastered the Beginner path! The Intermediate path dives into cancer-type-specific genomics, and Advanced covers computational approaches. Head to the Explorer to see everything you've learned in an interactive map.</p>
</div>`,
    quiz: { q: 'You see a blue node labeled "tumor suppressor" in the explorer. Which is most accurate?', opts: ['One mutant copy causes cancer', 'Its normal role promotes uncontrolled division', 'Both copies must usually be inactivated', 'It always drives cancer via amplification'], correct: 2, exp: "Tumor suppressors follow the Two-Hit Hypothesis — both copies must be lost. As long as one functional copy remains, it can perform its protective function (controlling the cell cycle, promoting apoptosis, repairing DNA)." },
    steps: [
      { type: 'hook', emoji: '🗺️', stat: "You're Ready!", label: 'Navigate the real cancer genome — starting right now', sub: 'Everything you learned is visualized live in the GeneLens Explorer. TP53, KRAS, BRCA1 — all waiting for you on the interactive map.', color: '#10b981' },
      { type: 'learn' },
      { type: 'game', gameId: 'pathwayOrder', title: '⚡ Pathway Builder', instructions: 'Click the RAS/MAPK cascade nodes in the correct signal order — from growth factor all the way to the nucleus.' },
      { type: 'quiz' },
    ],
  },
];
