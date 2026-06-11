export interface GeneDetail {
  mechanism: string;
  funFact: string;
  clinicalUse: string;
  upstream: string[];
  downstream: string[];
  prevalence: { cancer: string; pct: string }[];
  genomicLocation: string;
  proteinClass: string;
  notableTrials?: string[];
  resistanceMechanisms?: string[];
  biomarkerNote?: string;
}

export const GENE_DETAILS: Record<string, GeneDetail> = {
  KRAS: {
    mechanism: 'KRAS is a GTPase that cycles between active (GTP-bound) and inactive (GDP-bound) states. Mutations at codons 12, 13, or 61 block GTP hydrolysis — locking the protein in the active conformation and perpetually signaling downstream to BRAF and PI3K.',
    funFact: 'KRAS was considered "undruggable" for 40 years because its surface is nearly featureless. In 2013, researchers discovered a hidden "switch II pocket" that only opens in the G12C mutant — leading to Sotorasib (FDA approved 2021), one of oncology\'s biggest breakthroughs.',
    clinicalUse: 'KRAS G12C mutation testing is standard in all non-squamous NSCLC. KRAS G12C is also actionable in colorectal and pancreatic cancer. KRAS G12D inhibitors are in Phase I/II trials as of 2024.',
    upstream: ['EGFR', 'HER2', 'MET', 'SOS', 'NF1 (inhibitor)'],
    downstream: ['BRAF', 'RAF1', 'PI3K', 'RAL-GDS'],
    prevalence: [
      { cancer: 'Pancreatic ductal adenocarcinoma', pct: '90%' },
      { cancer: 'Colorectal cancer', pct: '45%' },
      { cancer: 'Non-small cell lung cancer', pct: '28%' },
      { cancer: 'Endometrial cancer', pct: '20%' },
    ],
    genomicLocation: 'Chromosome 12p12.1',
    proteinClass: 'Small GTPase (RAS family)',
    notableTrials: ['CodeBreaK 100 (Sotorasib)', 'KRYSTAL-1 (Adagrasib)', 'MIRATI-G12D'],
    resistanceMechanisms: ['KRAS G12C → G12D/V secondary mutation', 'NRAS/BRAF amplification', 'MET amplification', 'EMT transition'],
    biomarkerNote: 'KRAS G12C: ~13% of NSCLC, ~3-4% of CRC. G12D is most common overall but had no approved inhibitor until 2024 trials.',
  },

  EGFR: {
    mechanism: 'EGFR (ErbB1) is a transmembrane receptor tyrosine kinase. EGF binding triggers homodimerization or heterodimerization with HER2-4, autophosphorylating cytoplasmic tyrosine residues that recruit adapters (GRB2, SOS) activating RAS and PI3K. Exon 19 deletions and L858R point mutations lock the kinase in an active state independent of ligand.',
    funFact: 'The discovery of EGFR mutations in East Asian never-smokers with lung cancer transformed oncology — it revealed that "lung cancer" is not one disease. EGFR-mutant lung cancer responds so dramatically to Osimertinib that patients sometimes achieve near-complete remissions from advanced disease.',
    clinicalUse: 'EGFR mutation testing (exon 19 del, L858R, exon 20 ins, T790M) is mandatory in all non-squamous NSCLC at diagnosis. Osimertinib (3rd-gen TKI) is now first-line SoC for EGFR-mutant NSCLC.',
    upstream: ['EGF ligand', 'Amphiregulin', 'Betacellulin', 'HER2 (co-receptor)'],
    downstream: ['GRB2/SOS → KRAS', 'PI3K → AKT', 'STAT3', 'PLCγ → PKC'],
    prevalence: [
      { cancer: 'Lung adenocarcinoma (Asian)', pct: '50%' },
      { cancer: 'Lung adenocarcinoma (Western)', pct: '15%' },
      { cancer: 'Glioblastoma (amplification)', pct: '45%' },
      { cancer: 'Head & neck SCC', pct: '20% overexp.' },
    ],
    genomicLocation: 'Chromosome 7p11.2',
    proteinClass: 'Receptor tyrosine kinase (ErbB family)',
    notableTrials: ['FLAURA (Osimertinib 1L)', 'FLAURA2 (combo)', 'MARIPOSA (amivantamab)', 'PAPILLON (exon 20)'],
    resistanceMechanisms: ['T790M gatekeeper mutation (→ Osimertinib)', 'C797S under Osimertinib', 'MET amplification', 'HER2 amplification', 'KRAS/BRAF mutation', 'Histologic transformation to SCLC'],
    biomarkerNote: 'Companion diagnostic: cobas EGFR Mutation Test. Liquid biopsy with ctDNA can detect T790M resistance mutation.',
  },

  TP53: {
    mechanism: 'TP53 encodes a tetrameric transcription factor that binds p53-response elements to induce CDKN1A (p21), GADD45, and pro-apoptotic genes (PUMA, BAX). Under normal conditions, MDM2 continuously ubiquitinates p53, targeting it for degradation — keeping it at low levels. DNA damage triggers ATM/ATR-mediated phosphorylation of both p53 and MDM2, breaking the MDM2-p53 interaction and allowing p53 to accumulate and act.',
    funFact: 'p53 was originally discovered in 1979 as an "oncogene" because scientists were studying a mutant form. The wild-type version was correctly identified as a tumor suppressor only in 1989. It is now the most studied gene in all of biology, with over 100,000 publications.',
    clinicalUse: 'TP53 mutation is a prognostic rather than predictive biomarker in most cancers — it typically indicates more aggressive disease. R175H and R248W/Q are dominant-negative hotspot mutations that can also gain oncogenic functions. APR-246 (Eprenetapopt) partially reactivates mutant p53 (Phase III in MDS/AML).',
    upstream: ['ATM (DNA damage)', 'ATR (replication stress)', 'ARF/p14 (oncogenic stress)', 'MDM2 (negative regulator)'],
    downstream: ['p21/CDKN1A → cell cycle arrest', 'PUMA/NOXA → apoptosis', 'GADD45 → DNA repair', 'MDM2 (autoregulatory feedback)'],
    prevalence: [
      { cancer: 'Serous ovarian cancer', pct: '96%' },
      { cancer: 'All cancer types combined', pct: '>50%' },
      { cancer: 'Triple-negative breast cancer', pct: '85%' },
      { cancer: 'Colorectal cancer', pct: '60%' },
    ],
    genomicLocation: 'Chromosome 17p13.1',
    proteinClass: 'Sequence-specific transcription factor / tumor suppressor',
    notableTrials: ['PRIMA (niraparib maintenance)', 'APR-246-3001 (eprenetapopt)', 'MDM2 inhibitor trials (Navtemadlin)'],
    resistanceMechanisms: ['Second-site suppressor mutations that restore DNA binding', 'MDM2 amplification', 'Loss of p53 upstream kinases (ATM)'],
    biomarkerNote: 'Li-Fraumeni syndrome (germline TP53) causes multi-cancer predisposition. VAF (variant allele frequency) in liquid biopsy tracks tumor burden.',
  },

  BRAF: {
    mechanism: 'BRAF is a serine/threonine kinase that relays the RAS signal to MEK. The V600E substitution replaces a valine with glutamate, mimicking the phosphorylated activation loop and constitutively activating BRAF ~500-fold independent of RAS. In contrast, class II BRAF mutations (K601, G469) activate as dimers — and are resistant to vemurafenib because inhibitor binding to one monomer activates the other.',
    funFact: 'BRAF V600E was discovered in 2002 in a landmark Nature paper. When Vemurafenib entered clinical trials, a patient with late-stage melanoma went from being unable to walk to playing volleyball in 8 weeks. The clinical response rate was 80%, but most patients developed resistance within 6-12 months, driving the development of combination BRAF+MEK inhibition.',
    clinicalUse: 'BRAF V600E/K testing is mandatory in melanoma, colorectal, and papillary thyroid cancer. Combination BRAF+MEK inhibition (Dabrafenib+Trametinib, Encorafenib+Binimetinib) is SoC. In CRC, EGFR antibodies must be added (triplet therapy: Encorafenib+Binimetinib+Cetuximab).',
    upstream: ['KRAS/HRAS/NRAS', 'RAS-GTP binding', 'RAF dimerization partner (RAF1)'],
    downstream: ['MEK1/MEK2', 'ERK1/ERK2', 'Downstream: MYC, FOS, JUN, cyclin D1'],
    prevalence: [
      { cancer: 'Melanoma', pct: '50%' },
      { cancer: 'Papillary thyroid cancer', pct: '45%' },
      { cancer: 'Colorectal cancer', pct: '10%' },
      { cancer: 'Hairy cell leukemia', pct: '100% (V600E)' },
    ],
    genomicLocation: 'Chromosome 7q34',
    proteinClass: 'Serine/threonine-protein kinase (RAF family)',
    notableTrials: ['COMBI-d (Dabrafenib+Trametinib)', 'COLUMBUS (Encorafenib+Binimetinib)', 'BEACON CRC (triplet for CRC)'],
    resistanceMechanisms: ['BRAF amplification', 'BRAF splice variants (loss of RAS-binding domain)', 'NRAS mutation', 'MEK1/2 mutation', 'KRAS mutation', 'Receptor tyrosine kinase upregulation'],
    biomarkerNote: 'Class I = V600 (RAS-independent monomer): responds to vemurafenib. Class II = non-V600 activating dimer: requires MEK inhibitor. Class III = kinase-dead, RAS-dependent.',
  },

  BRCA1: {
    mechanism: 'BRCA1 functions as a scaffolding protein for the BRCA1-A, -B, and -C complexes involved in homologous recombination (HR). After a DSB, BRCA1 is recruited to γH2AX foci via BARD1, helping to resect DNA ends and recruit RAD51 via PALB2-BRCA2. Loss of BRCA1 forces cells to rely on error-prone NHEJ, causing chromosomal instability — and also creating dependency on PARP1 for SSB repair.',
    funFact: 'The BRCA1 gene discovery in 1994 (Mary-Claire King\'s lab) was the result of 17 years of analysis of familial breast cancer pedigrees. A woman carrying a BRCA1 pathogenic variant has a 65-72% lifetime risk of breast cancer — and this knowledge drove widespread genetic testing, the "Angelina Jolie effect" (2013), which doubled BRCA testing rates globally overnight.',
    clinicalUse: 'Germline BRCA1/2 testing is recommended for all ovarian cancer patients and high-risk breast cancer patients. Tumor BRCA1/2 (somatic) testing guides PARP inhibitor eligibility in ovarian, breast, prostate, and pancreatic cancer. Olaparib (SOLO-1 trial) doubled progression-free survival in BRCA1/2-mutant ovarian cancer.',
    upstream: ['ATM/ATR (DNA damage activation)', 'γH2AX (recruits BRCA1)', 'PALB2 (links BRCA1-BRCA2)', 'BARD1 (heterodimer partner)'],
    downstream: ['RAD51 loading (via PALB2/BRCA2)', 'HR repair completion', 'Cell cycle arrest at G2/M'],
    prevalence: [
      { cancer: 'Hereditary breast cancer', pct: '45% (germline)' },
      { cancer: 'Hereditary ovarian cancer', pct: '15% (germline)' },
      { cancer: 'Triple-negative breast cancer', pct: '20% somatic' },
      { cancer: 'Pancreatic cancer', pct: '3-5% germline' },
    ],
    genomicLocation: 'Chromosome 17q21.31',
    proteinClass: 'RING domain E3 ligase / DNA repair scaffold',
    notableTrials: ['SOLO-1/2 (Olaparib)', 'OlympiAD (Olaparib in mBC)', 'EMBRACA (Talazoparib)', 'BRCAway'],
    resistanceMechanisms: ['BRCA1 reversion mutations (restore reading frame)', 'BRCA1 hypomorphic splice variants', 'Loss of 53BP1/RIF1 restoring HR', 'PARP1 mutations reducing trapping'],
    biomarkerNote: 'HRD (Homologous Recombination Deficiency) score combines BRCA status + genomic scars (LOH, TAI, LST) — predicts PARP inhibitor benefit beyond just BRCA.',
  },

  BRCA2: {
    mechanism: 'BRCA2 directly loads RAD51 recombinase onto single-stranded DNA at resected DSB ends, forming the nucleoprotein filament required for strand invasion and homology search. BRCA2 contains 8 BRC repeats that each bind one RAD51 monomer. Without BRCA2, HR repair fails, DSBs are repaired by error-prone NHEJ, and the cell becomes genomically unstable.',
    funFact: 'The same BRCA2 mutation found in Ashkenazi Jewish populations (6174delT) can be traced to a common ancestor who lived in Eastern Europe approximately 500 years ago — a "founder effect." Up to 1 in 50 Ashkenazi Jews carries a BRCA1 or BRCA2 founder mutation, compared to 1 in 400 in the general population.',
    clinicalUse: 'BRCA2 mutations are actionable in ovarian, breast, prostate (TRITON2/3 trial), and pancreatic cancer. BRCA2-mutant pancreatic cancer has a dramatically better prognosis on Olaparib maintenance (POLO trial) compared to standard chemotherapy.',
    upstream: ['RPA-coated ssDNA (recruits BRCA2)', 'PALB2 (bridging factor from BRCA1)', 'FANCD1 (same gene — Fanconi anemia)'],
    downstream: ['RAD51 nucleofilament assembly', 'D-loop formation and homology search', 'Completion of HR repair'],
    prevalence: [
      { cancer: 'Hereditary breast cancer', pct: '30% (germline)' },
      { cancer: 'Hereditary ovarian cancer', pct: '10% (germline)' },
      { cancer: 'Prostate cancer (germline)', pct: '5%' },
      { cancer: 'Pancreatic cancer (germline)', pct: '5-7%' },
    ],
    genomicLocation: 'Chromosome 13q12.3',
    proteinClass: 'DNA repair scaffold (BRC repeat protein)',
    notableTrials: ['POLO (Olaparib, pancreatic)', 'TRITON2/3 (Rucaparib, prostate)', 'PROfound (Olaparib, prostate)'],
    resistanceMechanisms: ['BRCA2 reversion mutations (intragenic deletions restoring frame)', 'RAD51 paralog mutations restoring HR', 'PARP1 loss-of-function'],
    biomarkerNote: 'BRCA2 is the same gene as FANCD1 — biallelic loss causes Fanconi anemia subtype D1, with extreme cancer predisposition in childhood.',
  },

  PI3K: {
    mechanism: 'PIK3CA encodes the catalytic subunit p110α of PI3Kα. Hotspot mutations at E542K, E545K (helical domain) and H1047R (kinase domain) constitutively activate PI3K, phosphorylating PIP2 to PIP3 at the plasma membrane. PIP3 recruits and activates PDK1 which phosphorylates AKT-T308. E542K/E545K disrupt an inhibitory interaction with the regulatory p85 subunit; H1047R directly increases catalytic activity.',
    funFact: 'PIK3CA is the most frequently mutated kinase gene in cancer overall. In hormone receptor-positive breast cancer, PIK3CA H1047R is present in ~40% of tumors and can be detected in circulating tumor DNA before resistance develops — allowing pre-emptive therapy changes before radiologic progression.',
    clinicalUse: 'PIK3CA mutation testing guides Alpelisib use in HR+/HER2−/PIK3CA-mutant metastatic breast cancer (SOLAR-1 trial: +11mo PFS). Liquid biopsy ctDNA PIK3CA testing is FDA-approved companion diagnostic for Alpelisib.',
    upstream: ['RTKs (EGFR, HER2, MET, IGF1R)', 'RAS (direct activation of p110α)', 'PTEN (negative regulator)', 'G-protein coupled receptors'],
    downstream: ['PIP3 generation', 'PDK1 → AKT phosphorylation', 'mTOR pathway activation', 'RAC1 (cytoskeletal reorganization)'],
    prevalence: [
      { cancer: 'Breast cancer (HR+)', pct: '40%' },
      { cancer: 'Endometrial cancer', pct: '35%' },
      { cancer: 'Colorectal cancer', pct: '18%' },
      { cancer: 'Bladder cancer', pct: '15%' },
    ],
    genomicLocation: 'Chromosome 3q26.3',
    proteinClass: 'Lipid kinase (Class IA PI3K catalytic subunit)',
    notableTrials: ['SOLAR-1 (Alpelisib)', 'InSight (Inavolisib)', 'JULIETTE (Pilaralisib)'],
    resistanceMechanisms: ['PTEN loss', 'PIK3R1 mutations', 'AKT amplification', 'KRAS co-mutation', 'mTOR hyperactivation via S6K feedback'],
    biomarkerNote: 'Tumor mutation burden (TMB) and PIK3CA can co-occur. H1047R is most common (~50% of PIK3CA mutations), especially in luminal breast cancer.',
  },

  AKT: {
    mechanism: 'AKT (PKB) is activated by dual phosphorylation: PDK1 phosphorylates T308 after PIP3 docking; mTORC2 phosphorylates S473 for full activation. Active AKT phosphorylates >100 substrates including TSC2 (activating mTORC1), MDM2 (activating it → TP53 degradation), FOXO (nuclear exclusion → anti-apoptosis), BAD (anti-apoptosis), and GSK3 (→ Cyclin D1 stabilization).',
    funFact: 'The name "AKT" comes from the AKT8 mouse retrovirus isolated from the AKR strain of mice in the 1970s. AKT was long thought to be undruggable due to its central role — knocking it out kills normal cells too. Capivasertib (AZD5363) achieved FDA approval in 2023 specifically for AKT1 E17K-mutant breast cancer, finally making this target clinically addressable.',
    clinicalUse: 'AKT inhibitors (Capivasertib, Ipatasertib) are in clinical trials for breast and prostate cancer with AKT1 E17K or PTEN-loss context. Capivasertib + Fulvestrant approved for HR+/HER2−/PIK3CA-AKT1-PTEN altered metastatic breast cancer (CAPItello-291 trial).',
    upstream: ['PDK1 (T308 phosphorylation via PI3K)', 'mTORC2 (S473 phosphorylation)', 'PIP3 (membrane recruitment)', 'PTEN (negative regulator)'],
    downstream: ['mTORC1 (via TSC2 inhibition)', 'MDM2 (TP53 degradation)', 'FOXO transcription factors (nuclear exclusion)', 'BAD (prevents apoptosis)', 'GSK3β (Cyclin D1 stabilization)'],
    prevalence: [
      { cancer: 'Breast cancer (AKT1 E17K)', pct: '7%' },
      { cancer: 'Endometrial cancer', pct: '8%' },
      { cancer: 'Colorectal cancer', pct: '3%' },
      { cancer: 'Pan-cancer (pathway activation)', pct: '30%' },
    ],
    genomicLocation: 'Chromosome 14q32.33',
    proteinClass: 'Serine/threonine-protein kinase (AGC family)',
    notableTrials: ['CAPItello-291 (Capivasertib)', 'IPATunity130 (Ipatasertib)', 'AKTing trial'],
    resistanceMechanisms: ['PIK3CA co-mutation', 'RAS/RAF co-activation', 'Loss of PHLPP1/2 phosphatases', 'Feedback reactivation of RTKs'],
  },

  mTOR: {
    mechanism: 'mTOR exists in two complexes: mTORC1 (rapamycin-sensitive, contains Raptor) and mTORC2 (rapamycin-insensitive, contains Rictor). mTORC1 senses amino acids, energy (ATP/AMP ratio), and growth factors — when all are sufficient, it phosphorylates S6K1 (promoting ribosome biogenesis) and 4EBP1 (releasing eIF4E for cap-dependent translation). mTORC2 phosphorylates AKT-S473, creating a feedback loop.',
    funFact: 'mTOR was discovered by studying how rapamycin kills yeast. Rapamycin was found in soil bacteria from Easter Island (Rapa Nui — hence the name mTOR: mammalian Target Of Rapamycin). It was originally developed as an antifungal, then repurposed as an immunosuppressant for organ transplant, and now used as a cancer drug (Everolimus). One molecule, three clinical uses.',
    clinicalUse: 'mTOR inhibitors (Everolimus, Temsirolimus) are approved in renal cell carcinoma, pancreatic NETs, and HR+ breast cancer (with Exemestane). mTOR mutations (E2014K, E2419K) can predict sensitivity or resistance depending on context.',
    upstream: ['AKT (via TSC1/2 complex)', 'AMPK (negative, energy sensor)', 'Amino acid sensor GATOR complex', 'Rheb-GTP (mTORC1 activator)'],
    downstream: ['S6K1 → ribosome biogenesis', '4EBP1 → mRNA cap translation', 'ULK1 phosphorylation (autophagy suppression)', 'AKT-S473 (mTORC2 feedback)'],
    prevalence: [
      { cancer: 'Clear cell renal cell carcinoma', pct: '28% (pathway)' },
      { cancer: 'Pancreatic NETs', pct: '20%' },
      { cancer: 'Endometrial cancer', pct: '15%' },
      { cancer: 'Bladder cancer', pct: '10%' },
    ],
    genomicLocation: 'Chromosome 1p36.22',
    proteinClass: 'Serine/threonine protein kinase (PIKK family)',
    notableTrials: ['RECORD-1 (Everolimus RCC)', 'BOLERO-2 (Everolimus breast)', 'RADIANT-3 (Everolimus NETs)'],
    resistanceMechanisms: ['S6K1 → IRS-1 negative feedback reactivating PI3K', 'mTOR mutations', 'Autophagy upregulation as survival mechanism'],
  },

  BCL2: {
    mechanism: 'BCL-2 localizes to the outer mitochondrial membrane where it sequesters pro-apoptotic proteins BAX and BAK, preventing them from forming pores that release cytochrome c. BCL-2 contains a hydrophobic BH3-binding groove — the target of Venetoclax, which fits into this groove with sub-nanomolar affinity, displacing BAX/BAK and triggering apoptosis.',
    funFact: 'BCL-2 was discovered via the t(14;18) translocation in follicular lymphoma, which juxtaposes BCL2 with the immunoglobulin heavy chain promoter, causing massive BCL-2 overexpression. Venetoclax development took 15 years of medicinal chemistry to achieve the picomolar binding affinity needed — it became the first rationally designed BH3 mimetic drug, achieving complete remission in a significant fraction of CLL patients.',
    clinicalUse: 'Venetoclax is FDA-approved for CLL (with obinutuzumab), AML (with azacitidine), and certain lymphomas. BCL-2 inhibition is transforming hematological oncology — the CLL complete remission rates with fixed-duration venetoclax + obinutuzumab rival those of allogeneic transplant.',
    upstream: ['BCL-2 is constitutively expressed when overexpressed/amplified', 'Growth factor signaling (AKT phosphorylates and stabilizes BCL-2)', 'MCL-1 and BCL-XL are related anti-apoptotic proteins'],
    downstream: ['Sequesters BAX and BAK at mitochondria', 'Prevents cytochrome c release', 'Blocks apoptosome assembly'],
    prevalence: [
      { cancer: 'Follicular lymphoma (t(14;18))', pct: '85%' },
      { cancer: 'Chronic lymphocytic leukemia', pct: '70% overexp.' },
      { cancer: 'Diffuse large B-cell lymphoma', pct: '30%' },
      { cancer: 'Breast cancer', pct: '20% overexp.' },
    ],
    genomicLocation: 'Chromosome 18q21.33',
    proteinClass: 'Anti-apoptotic BCL-2 family protein (BH1-4 domains)',
    notableTrials: ['MURANO (Venetoclax CLL)', 'CLL14 (Venetoclax+Obinutuzumab)', 'VIALE-A (Venetoclax AML)', 'TRANSCEND (Liso-cel lymphoma)'],
    resistanceMechanisms: ['BCL-2 mutations in BH3-binding groove (G101V/D103E)', 'MCL-1 upregulation', 'BCL-XL upregulation', 'TP53 loss', 'Chromatin remodeling'],
    biomarkerNote: 'BCL-2 high expression by IHC or FISH t(14;18) detection predicts Venetoclax response in lymphoid malignancies.',
  },

  MDM2: {
    mechanism: 'MDM2 is an E3 ubiquitin ligase that targets TP53 for proteasomal degradation — and is itself a TP53 transcriptional target, creating a negative feedback loop. MDM2 also inhibits p53 transcriptional activity by binding the N-terminal transactivation domain even without promoting degradation. MDM2 amplification (>12 copies) bypasses p53 without mutation, enabling its use as a drug target even in TP53 wild-type tumors.',
    funFact: 'MDM2 was discovered as a gene amplified on Double Minute chromosomes (hence MDM) in a transformed mouse cell line. The MDM2-p53 interaction was structurally characterized in 1996, revealing a small hydrophobic cleft that binds three p53 residues (F19, W23, L26) — this structure was immediately recognized as a drug design opportunity. Navtemadlin (AMG-232) in clinical trials can reactivate p53 in MDM2-amplified sarcomas with wild-type p53.',
    clinicalUse: 'MDM2 amplification testing (FISH) is relevant in liposarcoma (>90%), glioblastoma, and other sarcomas. MDM2 inhibitors (Navtemadlin, Milademetan) are in Phase I/II specifically for MDM2-amplified/TP53-wild-type tumors.',
    upstream: ['TP53 (transcriptional induction)', 'AKT (phosphorylation stabilizes MDM2)', 'ERK (phosphorylation stabilizes MDM2)', 'ARF/p14 (inhibitor — nuclear sequestration)'],
    downstream: ['TP53 ubiquitination and degradation', 'Direct inhibition of p53 transactivation', 'E2F1 ubiquitination (cell cycle regulation)'],
    prevalence: [
      { cancer: 'Well-differentiated/de-differentiated liposarcoma', pct: '>90% amplified' },
      { cancer: 'Glioblastoma', pct: '10-15% amplified' },
      { cancer: 'Osteosarcoma', pct: '10%' },
      { cancer: 'Pan-cancer (MDM2 expression)', pct: '7% amplified' },
    ],
    genomicLocation: 'Chromosome 12q15',
    proteinClass: 'RING domain E3 ubiquitin ligase / p53 negative regulator',
    notableTrials: ['MIRROS (Milademetan liposarcoma)', 'AMG-232 Phase I/II (Navtemadlin)'],
    biomarkerNote: 'MDM2 inhibitors ONLY work in TP53 wild-type tumors — MDM2 inhibition kills cells by reactivating p53. Always check TP53 status before treating.',
  },

  PTEN: {
    mechanism: 'PTEN is a dual-specificity phosphatase that dephosphorylates PIP3 back to PIP2, directly antagonizing PI3K. It is the second most commonly mutated tumor suppressor after TP53. PTEN also has nuclear functions and protein phosphatase activity independent of lipid phosphatase. Even heterozygous loss (one copy) can haploinsufficiently activate the PI3K pathway, unusual for a classic "two-hit" tumor suppressor.',
    funFact: 'PTEN was simultaneously discovered by three groups in 1997, explaining why its name remains an awkward acronym (Phosphatase and TENsin homolog deleted on chromosome TEN). PTEN is the only phosphatase that is a tumor suppressor — most phosphatases act as oncogene brakes. Cowden syndrome (germline PTEN) carries >85% lifetime breast cancer risk, higher even than BRCA1.',
    clinicalUse: 'PTEN loss (IHC or sequencing) predicts poor prognosis and potential sensitivity to PI3K/AKT/mTOR inhibitors. In prostate cancer, PTEN deletion is the most common alteration (~40%) and predicts aggressive disease. Haploinsufficiency is clinically significant — one copy lost is often enough.',
    upstream: ['PI3K (generates PIP3, the PTEN substrate)', 'PTEN is constitutively active — regulated by localization and protein stability', 'PREX2 (inhibitor)', 'WWP2 ubiquitin ligase (degrades PTEN)'],
    downstream: ['Reduces PIP3 → inhibits PDK1 → reduces AKT activity', 'Indirectly suppresses mTOR, S6K, cell survival', 'Nuclear PTEN: maintains chromosomal stability'],
    prevalence: [
      { cancer: 'Endometrial cancer', pct: '60%' },
      { cancer: 'Glioblastoma', pct: '40%' },
      { cancer: 'Prostate cancer', pct: '40%' },
      { cancer: 'Breast cancer', pct: '35%' },
    ],
    genomicLocation: 'Chromosome 10q23.31',
    proteinClass: 'Lipid and protein phosphatase / tumor suppressor',
    biomarkerNote: 'PTEN IHC (loss) is used clinically in endometrial, prostate, and breast cancer. Copy number deletion more sensitive than mutation testing alone.',
  },

  RB1: {
    mechanism: 'Retinoblastoma protein (pRb) sequesters E2F transcription factors in its hypophosphorylated state, preventing S-phase gene transcription. CDK4/6-CyclinD complexes phosphorylate pRb at multiple residues, releasing E2F and committing the cell to S phase — the key restriction point of the cell cycle. CDK2-CyclinE then hyperphosphorylates pRb, locking the cell cycle past the restriction point. CDKN2A (p16) inhibits CDK4/6, maintaining pRb in its growth-suppressive state.',
    funFact: 'RB1 was the first tumor suppressor gene ever cloned (1986) and the gene that inspired Alfred Knudson\'s famous "two-hit hypothesis" (1971) — based on his statistical analysis of retinoblastoma incidence in children. Children who inherited one mutant RB1 copy developed tumors younger than sporadic cases, proving that both copies needed inactivation.',
    clinicalUse: 'RB1 loss predicts resistance to CDK4/6 inhibitors (palbociclib, ribociclib, abemaciclib) — there is no point in blocking CDK4/6 if its substrate RB1 is already inactivated. RB1 testing is increasingly used to guide CDK4/6 inhibitor decisions in HR+ breast cancer and bladder cancer.',
    upstream: ['CDK4/6 + Cyclin D (phosphorylates → inactivates pRb)', 'CDKN2A/p16 (inhibits CDK4/6)', 'CDK2 + Cyclin E (hyperphosphorylates)', 'PP1/PP2A phosphatases (reactivate pRb at mitosis exit)'],
    downstream: ['E2F1/2/3 release → S-phase genes (DHFR, thymidine kinase, Cyclin E)', 'E2F1 under stress → pro-apoptotic genes'],
    prevalence: [
      { cancer: 'Small cell lung cancer', pct: '>90%' },
      { cancer: 'Retinoblastoma', pct: '100%' },
      { cancer: 'Bladder cancer (muscle-invasive)', pct: '30%' },
      { cancer: 'Breast cancer (TNBC)', pct: '25%' },
    ],
    genomicLocation: 'Chromosome 13q14.2',
    proteinClass: 'Pocket protein / transcriptional co-repressor',
    biomarkerNote: 'RB1 loss by IHC or FISH is a companion biomarker used to exclude patients from CDK4/6 inhibitor therapy in some centers.',
  },

  CDKN2A: {
    mechanism: 'The CDKN2A locus uniquely encodes two completely distinct tumor suppressors using alternative reading frames: p16INK4a (inhibits CDK4/6 complex formation → prevents RB1 phosphorylation) and p14ARF (sequesters MDM2 in the nucleolus → stabilizes TP53). Deletion of CDKN2A therefore simultaneously impairs both the RB and p53 pathways — a highly efficient single event for a cancer cell.',
    funFact: 'CDKN2A is deleted or silenced in roughly 30% of all human cancers, making it one of the most commonly lost tumor suppressors. What makes it extraordinary is that one deletion disables two separate tumor suppressor pathways (RB and p53) simultaneously. Germline CDKN2A mutations cause Familial Atypical Multiple Mole Melanoma (FAMMM) syndrome — and also predispose to pancreatic cancer, explaining why melanoma patients have elevated pancreatic cancer risk.',
    clinicalUse: 'CDKN2A/p16 loss by IHC is a prognostic marker in multiple cancers. Homozygous deletion is common in glioblastoma (IDH-wildtype) and is part of the WHO diagnostic criteria. In melanoma, CDKN2A germline testing identifies familial melanoma syndrome.',
    upstream: ['Oncogenic stress (RAS activation triggers p14ARF)', 'Oxidative stress, replication stress'],
    downstream: ['p16INK4a → inhibits CDK4/6 → hypophosphorylated RB1 → cell cycle arrest', 'p14ARF → sequesters MDM2 → TP53 stabilization → arrest or apoptosis'],
    prevalence: [
      { cancer: 'Pancreatic ductal adenocarcinoma', pct: '90%' },
      { cancer: 'Glioblastoma (IDH-wt)', pct: '57%' },
      { cancer: 'Mesothelioma', pct: '80%' },
      { cancer: 'Melanoma', pct: '50%' },
    ],
    genomicLocation: 'Chromosome 9p21.3',
    proteinClass: 'CDK inhibitor (p16INK4a) / MDM2 inhibitor (p14ARF)',
    biomarkerNote: 'p16 IHC is used as a proxy for HPV integration in head and neck and cervical cancer — HPV E7 targets pRb, causing compensatory p16 overexpression.',
  },

  MYC: {
    mechanism: 'MYC is a basic helix-loop-helix transcription factor that heterodimerizes with MAX to bind E-box sequences (CACGTG) across the genome. Rather than being a classical activator of specific genes, MYC acts as a universal amplifier of all active transcription — "pausing" RNA polymerase II at thousands of genes and then releasing it when MYC is activated. MYC also suppresses differentiation, promotes ribosome biogenesis, and coordinates metabolic reprogramming.',
    funFact: 'MYC amplification is found in >50% of all human cancers — yet MYC itself has been considered undruggable for decades because it lacks a classic small-molecule binding pocket. BET bromodomain inhibitors (JQ1, developed by Jay Bradner at Harvard in 2010) indirectly target MYC by blocking BRD4, the transcription factor that "loads" MYC onto chromatin. JQ1 cannot be used clinically because it causes male infertility, but ABBV-075 (mivebresib) and other BET inhibitors are in trials.',
    clinicalUse: 'MYC amplification (FISH) is prognostically relevant in lymphoma (double/triple-hit: MYC + BCL2 + BCL6 translocations), breast, and lung cancer. High-grade B-cell lymphoma with MYC rearrangement has poor prognosis but may respond to intensive chemotherapy or CAR-T (Liso-cel).',
    upstream: ['ERK → phosphorylates MYC-S62 (stabilizing)', 'WNT/β-Catenin → transcribes MYC', 'NOTCH → transcribes MYC', 'Cyclin B-CDK1 → phosphorylates MYC-T58 (destabilizing, for ubiquitination)'],
    downstream: ['RNA Pol II pause-release at thousands of genes', 'Ribosome biogenesis (transcribes rRNA genes)', 'Metabolic reprogramming (LDHA, glutaminase)', 'Telomerase (hTERT transcription)'],
    prevalence: [
      { cancer: 'Burkitt lymphoma (t(8;14))', pct: '100%' },
      { cancer: 'Breast cancer (amplification)', pct: '20%' },
      { cancer: 'Non-small cell lung cancer', pct: '15%' },
      { cancer: 'Pan-cancer (expression elevated)', pct: '>50%' },
    ],
    genomicLocation: 'Chromosome 8q24.21',
    proteinClass: 'Basic helix-loop-helix transcription factor (MYC family)',
    notableTrials: ['Alisertib (Aurora A → MYC destabilization)', 'OTX015 (BET inhibitor)', 'ABBV-CLS-484 combo'],
    biomarkerNote: 'Double-hit lymphoma (MYC + BCL2 or BCL6 rearrangement) requires FISH at diagnosis and has distinct treatment implications (R-EPOCH vs R-CHOP).',
  },

  ALK: {
    mechanism: 'ALK is a receptor tyrosine kinase normally expressed only in the developing nervous system. In NSCLC, an inversion of chromosome 2p creates an EML4-ALK fusion gene — the EML4 portion causes constitutive dimerization, locking ALK kinase permanently active. The fusion was discovered in 2007 and within 4 years yielded an FDA-approved drug (Crizotinib) — the fastest bench-to-clinic translation in oncology history.',
    funFact: 'The EML4-ALK fusion was discovered by Mano et al. in Japan by a systematic search for kinase fusions in lung cancer, looking at only 75 patient tumors. The entire period from fusion discovery (2007) to FDA drug approval (Crizotinib, 2011) took just 4 years — a record that has never been beaten. Third-generation ALK inhibitors (Lorlatinib) now achieve CNS activity that was impossible with first-generation drugs.',
    clinicalUse: 'ALK FISH or IHC testing is mandatory in non-squamous NSCLC. Lorlatinib (3rd-gen) is now the preferred 1L therapy for ALK+ NSCLC due to superior CNS penetration and efficacy against all known resistance mutations (CROWN trial). >5-year PFS data with lorlatinib now available.',
    upstream: ['EML4 fusion partner (constitutive dimerization)', 'Ligands: Pleiotrophin, Midkine (in ALK-driven neuroblastoma)'],
    downstream: ['RAS/MAPK → proliferation', 'PI3K/AKT → survival', 'STAT3 → anti-apoptosis', 'PLCγ → PKC signaling'],
    prevalence: [
      { cancer: 'Non-small cell lung cancer', pct: '3-5%' },
      { cancer: 'Anaplastic large cell lymphoma', pct: '50-80% (NPM1-ALK)' },
      { cancer: 'Neuroblastoma', pct: '10% amplification' },
      { cancer: 'Inflammatory myofibroblastic tumor', pct: '50%' },
    ],
    genomicLocation: 'Chromosome 2p23.2-p23.1',
    proteinClass: 'Receptor tyrosine kinase (Insulin receptor superfamily)',
    notableTrials: ['CROWN (Lorlatinib 1L)', 'ALTA-1L (Brigatinib)', 'ALEX (Alectinib)', 'PROFILE 1014 (Crizotinib)'],
    resistanceMechanisms: ['ALK kinase domain mutations (G1202R, L1196M — overcome by Lorlatinib)', 'ALK amplification', 'Bypass: KRAS, EGFR, MET activation', 'EMT'],
    biomarkerNote: 'ALK FISH "break-apart" probe is FDA-approved companion diagnostic. ALK IHC (D5F3) is used as a rapid screen; positive cases confirmed by FISH.',
  },

  VHL: {
    mechanism: 'VHL protein forms the substrate recognition subunit of a ubiquitin E3 ligase complex (VHL-Elongin B/C-Cullin 2) that targets HIF-1α and HIF-2α for proteasomal degradation under normoxia. In the presence of oxygen, proline residues in HIF-α are hydroxylated by PHDs, creating the VHL recognition motif. VHL loss stabilizes HIF-α, which heterodimerizes with HIF-1β and transcribes VEGF, PDGF, GLUT1, EPO, and other hypoxia-response genes — even in the presence of oxygen (pseudohypoxia).',
    funFact: 'The VHL gene story is extraordinary: germline VHL mutations cause von Hippel-Lindau disease (hemangioblastomas, clear cell RCC, pheochromocytomas), and somatic VHL loss drives >90% of sporadic clear cell RCC. Belzutifan was developed specifically to target HIF-2α — the VHL downstream effector — and in 2021 achieved FDA approval for VHL disease, making it the first approved therapy for this genetic syndrome after decades of morbid surveillance and surgery.',
    clinicalUse: 'VHL loss is found in >90% of clear cell RCC and drives VEGF overproduction. VEGF-targeted therapies (Sunitinib, Pazopanib, Cabozantinib) have been first-line RCC SoC. Belzutifan (HIF-2α inhibitor) is now approved for VHL disease and being studied in sporadic ccRCC. mTOR inhibitors (Everolimus) also active downstream.',
    upstream: ['Oxygen-dependent PHD prolyl hydroxylases (create VHL recognition motif on HIF-α)', 'VHL is constitutively expressed — regulated by E3 ligase complex assembly'],
    downstream: ['HIF-1α and HIF-2α stabilization → nuclear translocation', 'VEGF/VEGFR upregulation (angiogenesis)', 'GLUT1 upregulation (glycolysis)', 'EPO upregulation (erythropoiesis)', 'PDGF-β upregulation (pericyte recruitment)'],
    prevalence: [
      { cancer: 'Clear cell renal cell carcinoma', pct: '>90%' },
      { cancer: 'Hemangioblastoma (VHL syndrome)', pct: '100%' },
      { cancer: 'Pheochromocytoma (germline)', pct: '10%' },
    ],
    genomicLocation: 'Chromosome 3p25.3',
    proteinClass: 'Substrate recognition subunit of CRL2 E3 ubiquitin ligase',
    notableTrials: ['LITESPARK-005 (Belzutifan ccRCC)', 'CLEAR (Lenvatinib+Pembrolizumab RCC)'],
    biomarkerNote: 'Patients with VHL syndrome should receive annual MRI for hemangioblastoma surveillance and renal ultrasound. Genetic counseling is essential.',
  },

  IDH1: {
    mechanism: 'Wild-type IDH1 converts isocitrate to α-ketoglutarate (αKG) in the TCA cycle. IDH1 R132H (and other hotspot mutations) produces the oncometabolite 2-hydroxyglutarate (2-HG) instead — which competitively inhibits αKG-dependent enzymes including TET2 (DNA demethylase), histone demethylases (KDMs), and PHDs. This causes CpG island methylator phenotype (CIMP), a pan-epigenetic "lock" that silences differentiation genes and creates a stem cell-like state.',
    funFact: 'IDH mutations were discovered in 2008 in a genome-wide sequencing study of glioblastoma — and were found to be early "initiating" events in low-grade glioma. IDH1 R132H creates a single-amino acid change that completely changes the enzyme\'s biochemistry. Because the oncometabolite 2-HG is absent in normal tissue, it can be measured non-invasively by MR spectroscopy directly in brain tumors — an extraordinary diagnostic tool.',
    clinicalUse: 'IDH1 R132H immunohistochemistry is a diagnostic tool for glioma classification (WHO 2021). Ivosidenib (IDH1 inhibitor) is FDA-approved for IDH1-mutant cholangiocarcinoma and AML. IDH1 mutation testing is standard in all glioma and AML.',
    upstream: ['Isocitrate (substrate)', 'IDH1 R132 mutation converts enzyme to 2-HG-producing neomorphic enzyme'],
    downstream: ['2-HG inhibits TET2 → DNA hypermethylation (CIMP)', '2-HG inhibits KDMs → histone hypermethylation', '2-HG inhibits PHDs → HIF-α stabilization', '2-HG inhibits EGLN → pseudohypoxia'],
    prevalence: [
      { cancer: 'Low-grade glioma (WHO grade 2-3)', pct: '70-80%' },
      { cancer: 'Secondary glioblastoma', pct: '80%' },
      { cancer: 'Acute myeloid leukemia', pct: '8%' },
      { cancer: 'Cholangiocarcinoma', pct: '13%' },
    ],
    genomicLocation: 'Chromosome 2q33.3',
    proteinClass: 'Metabolic enzyme (NADP+-dependent isocitrate dehydrogenase)',
    notableTrials: ['ClarIDHy (Ivosidenib cholangiocarcinoma)', 'AGILE (Ivosidenib + Azacitidine AML)', 'CohortA INDIGO (IDH mutant glioma, Vorasidenib)'],
    biomarkerNote: '2-HG can be quantified in blood/CSF and used to monitor IDH-inhibitor response. IDH1 R132H IHC is ~98% sensitive for this specific mutation.',
  },

  APC: {
    mechanism: 'APC protein forms the "β-catenin destruction complex" with AXIN1/2, GSK3β, and CK1α. In the absence of Wnt signaling, this complex phosphorylates β-catenin on serine and threonine residues, targeting it for ubiquitination by β-TrCP and proteasomal degradation. APC loss releases β-catenin from this complex, allowing it to accumulate, translocate to the nucleus, and partner with TCF/LEF transcription factors to activate target genes (MYC, Cyclin D1, VEGF).',
    funFact: 'Familial adenomatous polyposis (FAP) — caused by germline APC mutation — causes thousands of colorectal polyps by the teenage years and near-100% lifetime risk of colorectal cancer without prophylactic colectomy. The discovery of APC as the "gatekeeper" of colorectal cancer (Bert Vogelstein, 1991) established the model of sequential mutation accumulation in cancer — the "adenoma-carcinoma sequence" — which transformed our understanding of cancer development.',
    clinicalUse: 'APC mutation status is used to distinguish colorectal cancers with Wnt-driven vs. other mechanisms. Germline APC testing is the diagnostic basis for FAP and attenuated FAP. No direct APC-targeted therapy exists, but APC mutation predicts likely microsatellite stability (vs. MLH1/MSH2 loss which causes MSI).',
    upstream: ['Wnt ligand binding to Frizzled/LRP5/6 inhibits the destruction complex', 'Tankyrase (TNKS) inhibits AXIN, indirectly activating Wnt signaling'],
    downstream: ['β-catenin accumulation and nuclear translocation', 'TCF/LEF + β-catenin: MYC, Cyclin D1, VEGF, fibronectin', 'Wnt activation drives stem cell self-renewal and colon crypt cell proliferation'],
    prevalence: [
      { cancer: 'Colorectal cancer (sporadic)', pct: '80%' },
      { cancer: 'FAP (germline)', pct: '100%' },
      { cancer: 'Stomach cancer', pct: '30%' },
      { cancer: 'Desmoid tumor', pct: '70% (APC germline)' },
    ],
    genomicLocation: 'Chromosome 5q22.2',
    proteinClass: 'Tumor suppressor scaffold protein (Wnt pathway negative regulator)',
    biomarkerNote: 'APC mutation type predicts FAP severity: mutations in the mutation cluster region (codon 1250-1464) → most severe polyposis. Extracolonic manifestations (desmoid, CHRPE) correlate with specific mutation positions.',
  },

  MLH1: {
    mechanism: 'MLH1 forms a heterodimer with PMS2 (MutLα complex) that is recruited to mismatch-containing DNA to coordinate repair after initial mismatch recognition by MutSα (MSH2-MSH6) or MutSβ (MSH2-MSH3). Loss of MLH1 (via mutation, deletion, or promoter methylation) disrupts mismatch repair, causing microsatellite instability (MSI-H): repetitive short DNA sequences throughout the genome accumulate frameshift mutations at a rate of 100-1000x normal.',
    funFact: 'In 2022, dostarlimab (PD-1 inhibitor) achieved 100% complete clinical response in 12 consecutive patients with MSI-H locally advanced rectal cancer in a small trial — all avoided surgery, radiation, and chemotherapy. This was the first cancer in a clinical trial to achieve 100% complete clinical response with a single drug. MLH1 promoter hypermethylation (epigenetic silencing) is responsible for most sporadic MSI-H colorectal cancers.',
    clinicalUse: 'Universal MSI/MMR testing is recommended for all colorectal and endometrial cancers. MSI-H status predicts exceptional response to PD-1 inhibitors (Pembrolizumab, Dostarlimab) — FDA-approved pan-tumor indication. MSI testing is also performed via PCR (5-marker panel) or NGS.',
    upstream: ['MLH1 is recruited by MutSα after mismatch recognition', 'MLH1 promoter is frequently silenced by CpG methylation in sporadic colorectal cancer'],
    downstream: ['PMS2 (heterodimer partner)', 'Endonuclease activation → nick formation flanking mismatch', 'Exonuclease I → excision of mismatch-containing strand', 'DNA Pol δ resynthesis'],
    prevalence: [
      { cancer: 'MSI-H colorectal cancer (sporadic)', pct: '15%' },
      { cancer: 'Lynch syndrome CRC (MLH1 germline)', pct: '40%' },
      { cancer: 'Endometrial cancer (sporadic)', pct: '30%' },
      { cancer: 'Gastric cancer', pct: '15%' },
    ],
    genomicLocation: 'Chromosome 3p22.2',
    proteinClass: 'Mismatch repair endonuclease (MutL homolog family)',
    notableTrials: ['KEYNOTE-158 (Pembrolizumab MSI-H)', 'GARNET (Dostarlimab MSI-H)', 'Dostarlimab rectal cancer trial (2022)'],
    biomarkerNote: 'Lynch syndrome: germline MMR gene mutation (MLH1, MSH2, MSH6, PMS2, EPCAM). 1 in 280 people. Causes CRC, endometrial, ovarian, gastric, urinary tract cancers.',
  },
};
