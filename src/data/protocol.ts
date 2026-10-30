/** Typed protocol data for the Kew herbarium DNA extraction pipeline */

export interface Step {
  readonly id: number;
  readonly text: string;
  readonly info?: string;
  readonly tip?: string;
  readonly herbariumNote?: string;
  /** Calculated volume keys this step references */
  readonly calcRefs?: readonly string[];
}

export interface Substage {
  readonly title: string;
  readonly ref?: string;
  readonly steps: readonly Step[];
}

export interface Stage {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly timeEstimate: string;
  readonly introNote: string;
  readonly substages: readonly Substage[];
}

export interface DecisionCell {
  readonly sizeRange: string;
  readonly amountRange: string;
  readonly startingDna: string;
  readonly shearing: string;
  readonly sizeSelection: string;
  readonly adaptorDilute: string;
  readonly pcrCycles: string;
}

export const DECISIONS_TABLE: readonly DecisionCell[] = [
  { sizeRange: ">1500 bp", amountRange: ">200 ng", startingDna: "200–400", shearing: "Long", sizeSelection: "Yes", adaptorDilute: "No", pcrCycles: "6" },
  { sizeRange: ">1500 bp", amountRange: "<200 ng", startingDna: "All", shearing: "Long", sizeSelection: "Yes", adaptorDilute: "No", pcrCycles: "6/8" },
  { sizeRange: ">1500 bp", amountRange: "<100 ng", startingDna: "All", shearing: "Long", sizeSelection: "Yes", adaptorDilute: "Yes", pcrCycles: "8" },
  { sizeRange: "500–1500 bp", amountRange: ">200 ng", startingDna: "200–400", shearing: "Short", sizeSelection: "Yes", adaptorDilute: "No", pcrCycles: "6/8" },
  { sizeRange: "500–1500 bp", amountRange: "<200 ng", startingDna: "All", shearing: "Short", sizeSelection: "Yes", adaptorDilute: "Yes", pcrCycles: "8" },
  { sizeRange: "500–1500 bp", amountRange: "<100 ng", startingDna: "All", shearing: "Short", sizeSelection: "Yes", adaptorDilute: "Yes", pcrCycles: "8/10" },
  { sizeRange: "100–500 bp", amountRange: ">200 ng", startingDna: "200–700", shearing: "No", sizeSelection: "Yes", adaptorDilute: "No", pcrCycles: "10" },
  { sizeRange: "100–500 bp", amountRange: "<200 ng", startingDna: "All", shearing: "No", sizeSelection: "Yes/No", adaptorDilute: "Yes", pcrCycles: "10/12" },
  { sizeRange: "100–500 bp", amountRange: "<100 ng", startingDna: "All", shearing: "No", sizeSelection: "No", adaptorDilute: "Yes", pcrCycles: "10/12" },
  { sizeRange: "<100 bp", amountRange: ">200 ng", startingDna: "200–700", shearing: "No", sizeSelection: "Yes/No", adaptorDilute: "Yes", pcrCycles: "12" },
  { sizeRange: "<100 bp", amountRange: "<200 ng", startingDna: "All", shearing: "No", sizeSelection: "No", adaptorDilute: "Yes", pcrCycles: "12" },
  { sizeRange: "<100 bp", amountRange: "<100 ng", startingDna: "All", shearing: "No", sizeSelection: "No", adaptorDilute: "Yes", pcrCycles: "12" },
];

export const STAGES: readonly Stage[] = [
  {
    id: "extraction",
    label: "1. DNA Extraction",
    title: "DNA Extraction",
    timeEstimate: "~12+ hours active work + precipitation time",
    introNote: "Old herbarium leaves are already dried. Use ~20 mg per tube (~1/3 of a 2 mL tube). DNA from herbarium material is typically degraded, so expect smaller fragment sizes and lower yields than fresh material. Use 2 replicates (tubes) per specimen by default.",
    substages: [
      {
        title: "Sample Grinding",
        ref: "Section 1.4.1.2",
        steps: [
          {
            id: 1,
            text: "Using scissors, forceps, and gloved hands, cut leaf fragments into smaller pieces (~5×5 mm) directly into a 2 mL centrifuge tube until you have <strong>~20 mg</strong> (~1/3 of the tube).",
            info: "Small pieces expose more cell surface area to the lysis buffer. 20 mg is optimal for the CTAB volume used — too much tissue oversaturates the buffer and traps DNA in debris. For old herbarium specimens, tissue is brittle and crumbles easily.",
            tip: "Herbarium sheet fragments are already dry — handle gently to avoid losing powdery tissue. If the specimen is very old or fragile, work over a clean weighing paper to catch fragments. Always wear gloves to prevent contamination with modern DNA.",
          },
          {
            id: 2,
            text: "Add two metal beads (4 mm stainless steel) to each tube.",
            info: "Metal beads act as grinding media during mechanical disruption. Their mass and hardness pulverise dried leaf tissue into fine powder, breaking open cell walls to release DNA. Two beads create multi-directional impact for thorough homogenisation.",
          },
          {
            id: 3,
            text: "If possible, place tubes in the −80 °C freezer for at least a few hours so tissue becomes \"crispy.\"",
            info: "Extreme cold makes plant cell walls brittle, enabling cleaner fracture during grinding. This also inhibits nuclease activity, protecting DNA from enzymatic degradation during the process.",
            tip: "Herbarium material is already dry, so freezing improves grinding efficiency marginally. Still recommended for older, more recalcitrant specimens. Overnight at −80 °C works well if time permits.",
          },
          {
            id: 4,
            text: "Grind for <strong>2 min at 25 Hz</strong>. If using a 2-horizontal-grinder machine, turn around the adapters and grind again 2 min at 25 Hz. Repeat until you obtain a fine powder.",
            info: "Mechanical disruption fractures cell walls and releases cellular contents including DNA. 25 Hz is calibrated for leaf tissue — higher frequencies could overheat and shear DNA. Turning adapters ensures even grinding across all samples.",
            tip: "Check after each round. Fine powder = optimal. Coarse fragments = grind again. If a tube cracks or opens during grinding, seal it immediately and clean the block to prevent cross-contamination.",
          },
          {
            id: 5,
            text: "Centrifuge tubes for 10 seconds to settle powder. Keep metallic beads in the tubes. Proceed to CTAB extraction.",
            info: "Brief centrifugation pulls powder to the tube bottom, preventing loss when the tube is opened. Beads stay in — they won't interfere with the extraction chemistry and are easier to remove after lysis.",
          },
        ],
      },
      {
        title: "CTAB Extraction — Set Up",
        ref: "Section 1.4.2.1",
        steps: [
          {
            id: 6,
            text: 'Turn on hot water bath at <strong>65 °C</strong>. Place <span class="calc-val" data-calc="ctabVol"></span> of CTAB buffer in a 50 mL falcon tube into the water bath.',
            info: "CTAB (cetyltrimethylammonium bromide) is a cationic detergent that lyses cell membranes and denatures proteins, releasing DNA into solution. Pre-heating to 65 °C activates the buffer and ensures rapid cell lysis on contact. The +2 excess accounts for pipetting losses.",
            tip: "Prepare CTAB with PVP (polyvinylpyrrolidone) to bind polyphenols and other secondary metabolites that are abundant in herbarium leaves and can inhibit downstream reactions.",
            calcRefs: ["ctabVol"],
          },
          {
            id: 7,
            text: "Place a 50 mL falcon tube of isopropanol in the −20 °C freezer to chill.",
            info: "Cold isopropanol will be used later to precipitate DNA out of solution. At −20 °C, isopropanol reduces DNA solubility more effectively, improving recovery of even small or degraded fragments — critical for herbarium material.",
          },
          {
            id: 8,
            text: "Centrifuge tubes briefly to settle powder before opening.",
            info: "Prevents powder from escaping the tube or becoming airborne when opened, which could cause cross-contamination between samples and loss of starting material.",
          },
        ],
      },
      {
        title: "CTAB Addition & Incubation",
        ref: "Section 1.4.2.2",
        steps: [
          {
            id: 9,
            text: 'Add <span class="calc-val" data-calc="mercapVol"></span> of 2-mercaptoethanol to the hot CTAB. Close tube and invert gently to mix (avoid bubbles). Do this only when ready to add buffer to samples.',
            info: "2-mercaptoethanol is a reducing agent that breaks disulfide bonds in proteins, denaturing nucleases (DNases) that would otherwise degrade DNA. It also helps inactivate polyphenol oxidases abundant in old plant tissue. Added last because it is volatile and degrades in heat.",
            tip: "Work in a fume hood — 2-mercaptoethanol has a strong, unpleasant odour and is toxic. Add just before pipetting CTAB to samples to maximise its protective effect.",
            calcRefs: ["mercapVol"],
          },
          {
            id: 10,
            text: "Pipette <strong>750 μL</strong> heated CTAB mixture into each sample tube. Do not touch the tube with the tip (change tip if you do). Then add <strong>4 μL RNase</strong> directly into each tube using separate tips. Close tightly and vortex thoroughly.",
            info: "The hot CTAB lyses cells and solubilises DNA. RNase A degrades co-extracted RNA, which would otherwise contaminate the DNA sample, interfere with concentration measurement, and consume sequencing capacity. Changing tips prevents inter-sample contamination.",
            tip: "Vortex vigorously to ensure the powder is fully resuspended. For herbarium tissue, the powder may clump — pipette up and down a few times if needed to break up clumps after vortexing.",
          },
          {
            id: 11,
            text: "Incubate at <strong>65 °C for 3 hours</strong>. Vortex every ~30 minutes or keep tubes moving during incubation.",
            info: "Prolonged incubation at 65 °C ensures complete cell lysis, protein denaturation, and maximum DNA release from plant tissue. Periodic mixing maintains contact between buffer and tissue particles. Trials show no further improvement above 3 hours.",
            tip: "For old herbarium specimens, some researchers extend to 4 hours or even overnight, though the Kew protocol found no yield improvement past 3 hours for most samples. Batch multiple sets — 24–30 tubes can be processed together.",
          },
        ],
      },
      {
        title: "SEVAG Addition & DNA Precipitation",
        ref: "Section 1.4.2.3",
        steps: [
          {
            id: 12,
            text: "Transfer <strong>750 μL SEVAG</strong> (24:1 chloroform:isoamyl alcohol) to each tube. Close tightly and vortex thoroughly.",
            info: "SEVAG is an organic solvent that denatures and removes proteins from the aqueous phase. Chloroform dissolves lipids and denatures proteins; isoamyl alcohol (1/24th) reduces foaming and stabilises the phase boundary, making clean separation easier.",
            tip: "Work in a fume hood. Chloroform is a volatile organic solvent — avoid inhalation. Ensure tubes are tightly sealed before vortexing to prevent leaks.",
          },
          {
            id: 13,
            text: "Tape tubes horizontally on a rack and agitate on an orbital shaker for <strong>30 minutes</strong>.",
            info: "Gentle, sustained mixing maximises contact between the organic and aqueous phases, ensuring thorough protein extraction. Horizontal taping prevents tubes from detaching during shaking.",
          },
          {
            id: 14,
            text: "Centrifuge at <strong>13,000 rpm for 15 minutes</strong> to separate phases.",
            info: "High-speed centrifugation separates the mixture into three layers: upper aqueous (contains DNA), interphase (denatured proteins), and lower organic (lipids, chloroform). Clear separation is essential for clean DNA recovery.",
          },
          {
            id: 15,
            text: "Carefully transfer the <strong>supernatant</strong> (upper aqueous phase) to a new labelled tube using a fresh tip for each. <strong>Avoid the interphase and lower phase.</strong>",
            info: "DNA partitions into the upper aqueous phase. The interphase contains denatured proteins and cell debris. Contamination with the lower organic phase introduces chloroform, inhibiting downstream enzymatic reactions.",
            tip: "Pipette slowly and stop well above the interphase. It's better to leave some supernatant behind than to disturb the interphase. For herbarium extractions, the interphase may be darker due to oxidised phenolic compounds.",
          },
          {
            id: 16,
            text: "",
            herbariumNote: "Repeat steps 12–15 once more (total of 2× SEVAG washes). This second wash removes additional proteins and polysaccharides that are common in old, degraded plant tissue.",
          },
          {
            id: 17,
            text: "Add <strong>2/3 of the supernatant volume</strong> of freezer-chilled (−20 °C) isopropanol. Change tip if it touches the tube.",
            info: "Isopropanol reduces the dielectric constant of the solution, making DNA insoluble. The 2:3 ratio is optimised to precipitate DNA while leaving smaller contaminants in solution. Cold temperature enhances precipitation, especially important for small, degraded fragments from herbarium material.",
          },
          {
            id: 18,
            text: "Close all lids firmly and gently invert tubes several times to mix.",
            info: "Gentle inversion mixes the isopropanol and aqueous phase without shearing DNA. Vigorous mixing (vortexing) could fragment already-degraded herbarium DNA further.",
          },
          {
            id: 19,
            text: "Leave samples to precipitate in the freezer at <strong>−20 °C for at least 1 day</strong>.",
            info: "Extended precipitation at −20 °C allows even small DNA fragments to aggregate and fall out of solution. Old herbarium DNA is often present in low concentrations and small sizes, so longer precipitation improves recovery.",
            herbariumNote: "For old herbarium leaves (dried in silica gel or naturally desiccated), the minimum is 1 day. Longer precipitation (up to 1 week) may improve recovery of degraded, low-concentration DNA. For cane samples the protocol specifies 1 week minimum.",
          },
        ],
      },
      {
        title: "DNA Elution & Resuspension",
        ref: "Section 1.4.2.4",
        steps: [
          {
            id: 20,
            text: "Immediately from the freezer, centrifuge at <strong>13,000 rpm for 15 minutes</strong>.",
            info: "Centrifugation pellets the precipitated DNA at the bottom of the tube. Processing directly from the freezer keeps DNA precipitated and prevents re-dissolution before pelleting.",
          },
          {
            id: 21,
            text: "Discard the supernatant by bending the tube over a waste container. Be careful not to discard the pellet. Use tissue paper to catch the last drop. If no pellet is visible, leave a small volume of supernatant.",
            info: "The supernatant contains isopropanol and dissolved contaminants. The pellet is the precipitated DNA. With herbarium DNA, the pellet may be very small or invisible due to low yields — erring on the side of caution preserves irreplaceable material.",
            tip: "Herbarium DNA pellets are often tiny and translucent. Mark the side of the tube facing the centrifuge rotor — the pellet will be on that side. Decant slowly away from the pellet side.",
          },
          {
            id: 22,
            text: "Transfer <strong>750 μL 70% ethanol</strong> to each tube. Change tip if it touches the tube.",
            info: "70% ethanol washes away residual salts, CTAB, and isopropanol from the DNA pellet without dissolving the pellet itself. This purification step is essential for downstream enzymatic reactions.",
          },
          {
            id: 23,
            text: "Vortex, flick, or use a pipette tip to detach the pellet from the side of the tube.",
            info: "Dislodging the pellet ensures the ethanol washes all surfaces of the DNA precipitate, removing trapped contaminants more effectively.",
          },
          {
            id: 24,
            text: "Centrifuge at <strong>13,000 rpm for 15 minutes</strong>. Discard supernatant.",
          },
          {
            id: 25,
            text: "",
            herbariumNote: "Repeat ethanol wash (steps 22–24) once more, for a total of 2× ethanol washes. Then discard the supernatant again. The extra wash is critical for dried leaf material, which carries more co-precipitated polysaccharides and phenolics.",
          },
          {
            id: 26,
            text: 'Prop tubes open in a rack or on their sides on clean tissue paper. Allow to dry completely until <strong>absolutely no ethanol remains</strong> (~2 hours at room temperature, or 5–10 minutes in an oven).',
            info: "Residual ethanol inhibits downstream enzymatic reactions (library prep, PCR). Complete evaporation is essential. However, over-drying can make the pellet difficult to resuspend.",
            tip: "Check by sniffing the tube mouth (no ethanol smell). Don't leave in the oven more than 10 minutes — an over-dried pellet is very hard to redissolve, especially with degraded herbarium DNA.",
          },
          {
            id: 27,
            text: "Heat an aliquot of <strong>Molecular Grade water</strong> (or 10 mM Tris-HCl) in a 65 °C water bath. Prefer Molecular Grade water if samples will be dried down and combined later.",
            info: "Warm water improves DNA pellet dissolution. Molecular Grade water avoids introducing buffer salts that would concentrate when multiple extractions from one sample are combined via Speedvac.",
          },
          {
            id: 28,
            text: "Add <strong>100 μL</strong> warmed Molecular Grade water to each tube. Change tip if it touches the tube. Vortex or mix by pipetting until the pellet is completely dissolved. If the pellet doesn't dissolve easily, incubate at 65 °C for a few minutes then try again.",
            info: "DNA must be fully dissolved in aqueous solution for accurate concentration measurement and use in library preparation. Incomplete dissolution leads to underestimated concentrations and inconsistent downstream results.",
          },
        ],
      },
      {
        title: "Combining Extractions",
        ref: "Section 1.4.2.5",
        steps: [
          {
            id: 29,
            text: "If multiple tubes were used for one sample, line up all tubes from that sample and transfer their volumes into a single labelled tube.",
          },
          {
            id: 30,
            text: "Use a Speedvac at <strong>35 °C</strong> to reduce volume to 100 μL. Alternatively, run Speedvac until completely dry, then resuspend in 100 μL warm Molecular Grade water, vortex and spin.",
            info: "Combining and concentrating extractions from a single specimen maximises DNA recovery. The Speedvac evaporates water under vacuum at low temperature, preventing heat damage to DNA. Final volume of 100 μL is the standard input for quality control.",
          },
          { id: 31, text: "Store samples at <strong>−20 °C / −80 °C</strong> until quality control." },
        ],
      },
      {
        title: "DNA Quality Control",
        ref: "Section 1.4.3",
        steps: [
          {
            id: 32,
            text: "Measure DNA concentration using the <strong>Quantus Fluorometer</strong> (Promega) following the manufacturer's protocol.",
            info: "Fluorometric quantification is specific to double-stranded DNA and is not affected by RNA, free nucleotides, or contaminants that inflate spectrophotometric (NanoDrop) readings. Accurate concentration measurement is critical for calculating library prep inputs.",
          },
          {
            id: 33,
            text: "Prepare a <strong>1% agarose gel</strong>: 1 g agarose in 100 mL 1× TBE buffer. Microwave in 30-second stints, swirl between each. When cool enough to touch, add 2 μL ethidium bromide. Pour into mould tray and allow to solidify.",
            info: "Gel electrophoresis reveals the size distribution of extracted DNA. High molecular weight DNA appears as a tight band near the top; degraded DNA appears as a smear. This information determines whether shearing is needed and how to optimise library preparation.",
          },
          {
            id: 34,
            text: "Load wells: combine <strong>2 μL sample + 1 μL loading dye</strong>. Add <strong>1 μL DNA ladder</strong> to edge wells. Run electrophoresis at <strong>100 V (50 A) for 30–40 minutes</strong>. Image under UV.",
          },
          {
            id: 35,
            text: 'If DNA concentration is < 2 ng/μL or nothing visible on gel, use the <strong>Agilent TapeStation</strong> for fragment size analysis. Use "Genomic" tapes if unsure, or "D1000" tapes if DNA is expected to be very degraded.',
            info: "The TapeStation provides a precise electropherogram showing the fragment size distribution, which is essential for deciding shearing parameters and library prep conditions (see Decisions Table in Library Prep stage). It requires much less DNA than gel electrophoresis.",
            tip: "For old herbarium specimens, TapeStation analysis is often more informative than gel electrophoresis since DNA concentrations are frequently low. D1000 tapes are better for highly degraded DNA (<1000 bp fragments).",
          },
        ],
      },
    ],
  },
  {
    id: "library",
    label: "2. Library Prep",
    title: "DNA Library Preparation",
    timeEstimate: "3–4 days total",
    introNote: "NEBNext Ultra II DNA Library Prep Kit for Illumina. Consult the Decisions Table below before starting. Herbarium leaf DNA is often degraded (<500 bp fragments) — this affects shearing, adaptor dilution, and PCR cycle decisions.",
    substages: [
      {
        title: "Sample Preparation",
        ref: "Section 1.5.1",
        steps: [
          {
            id: 1,
            text: "Determine if samples need shearing based on gel/TapeStation results and the Decisions Table.",
            info: "DNA fragments must be within a target size range (300–400 bp insert) for efficient library construction. Large fragments from intact DNA need shearing; degraded herbarium DNA (<500 bp) typically does not.",
          },
          {
            id: 2,
            text: "Calculate volume for <strong>500–700 ng DNA in 50 μL</strong> (or 52 μL if shearing). Formula: Desired ng ÷ concentration (ng/μL). Make up to volume with Molecular Grade water.",
            info: "Starting with 500–700 ng maximises library yield, especially for degraded DNA. The standardised 50 μL volume ensures consistent enzymatic reaction stoichiometry across all samples.",
            tip: "For herbarium specimens with very low yields, proceed with whatever DNA is available. The protocol accommodates low input with adaptor dilution and higher PCR cycles. Even 10–50 ng can produce usable libraries.",
          },
          {
            id: 3,
            text: "If shearing is needed, transfer to Covaris strip wells and run the appropriate programme. Shearing time: 55 s (long) or 30 s (short) per Decisions Table. Transfer 50 μL back to the library plate.",
            info: "Covaris focused ultrasonication creates random, reproducible breaks in DNA, producing fragments of the target size range for sequencing. Unlike enzymatic fragmentation, it does not introduce sequence bias.",
          },
        ],
      },
      {
        title: "DNA End Preparation",
        ref: "Section 1.5.2",
        steps: [
          {
            id: 4,
            text: 'Follow NEBNext Ultra II manual "NEBNext End Prep" section. Add End Prep mix to wells, then add prepared DNA. Account for <strong>n+1 libraries</strong> when calculating reagent volumes.',
            info: "End preparation repairs ragged DNA ends, removes 3′ overhangs and fills in 5′ overhangs to create blunt ends, then adds a single adenosine (dA-tail) to the 3′ end. This A-tail is complementary to the T-overhang on the sequencing adaptor, enabling directional ligation.",
          },
        ],
      },
      {
        title: "DNA Adaptor Ligation",
        ref: "Section 1.5.3",
        steps: [
          {
            id: 5,
            text: 'If Decisions Table indicates adaptor dilution: dilute adaptor 1:10 with Molecular Grade water. Follow NEBNext manual "Adaptor Ligation" section.',
            info: "Adaptors are short synthetic DNA sequences that ligate to the prepared fragment ends. They contain sequences for flow cell binding, PCR priming, and sample indexing. Diluting for low-input DNA prevents adaptor-dimers that consume sequencing capacity.",
            tip: "For highly degraded herbarium DNA (<100 bp fragments, <100 ng input), always dilute adaptors 10×. If significant adaptor-dimer peaks persist, consider 50× dilution on a repeat.",
          },
        ],
      },
      {
        title: "Size Selection or Clean-up",
        ref: "Section 1.5.4",
        steps: [
          {
            id: 6,
            text: "Per Decisions Table, perform either <strong>size selection</strong> or <strong>simple clean-up</strong> using AMPure XP beads.",
            info: "Size selection uses SPRI beads at specific ratios to retain fragments in the target range (300–400 bp insert). For degraded DNA (<100 ng), simple clean-up is preferred to avoid losing precious material. SPRI beads bind DNA reversibly via PEG-mediated crowding.",
            tip: "Ensure beads are at room temperature and well vortexed. When distributing to wells, re-vortex every few samples. If using half volumes, the second bead addition is 7 μL (not halved). Pipette to fully resuspend beads during elution.",
          },
        ],
      },
      {
        title: "PCR Amplification",
        ref: "Section 1.5.5",
        steps: [
          {
            id: 7,
            text: 'Follow NEBNext manual "PCR Enrichment of Adaptor-ligated DNA." Add <strong>NEBNext Dual Index Primers</strong> (unique i5+i7 per sample). Use PCR cycles from the Decisions Table.',
            info: "PCR amplifies adaptor-ligated fragments and attaches unique dual-index sequences. These indexes allow multiplexing: pooling many libraries in one sequencing run and demultiplexing reads later. More cycles compensate for low input but increase PCR duplicates and bias.",
            tip: "Keep careful records of which index combination goes to which sample. For herbarium DNA with <100 ng input, 10–12 cycles are typical. Plan index assignments before starting.",
          },
        ],
      },
      {
        title: "PCR Clean-up",
        ref: "Section 1.5.6",
        steps: [
          {
            id: 8,
            text: 'Follow NEBNext manual "Cleanup of PCR Reaction" using AMPure XP beads. For difficult samples, elute in <strong>17 μL</strong> buffer (instead of 33 μL) for a final volume of 15 μL.',
            info: "Removes primers, dNTPs, enzymes, and salts from the PCR reaction. Smaller elution volume concentrates the library, especially important for low-input herbarium DNA.",
          },
          {
            id: 9,
            text: "Measure final library concentration (Quantus) and fragment size (Agilent TapeStation D1000 tape).",
            info: "Library QC determines if further clean-up or re-PCR is needed. Good libraries show a clear peak at the target size (300–400 bp insert) with minimal adaptor peaks.",
            tip: "If library concentration < 1 ng/μL, consider re-PCR (6 additional cycles). If large fragments outside target range, perform large fragment clean-up (0.5× then 0.8× SPRI beads). Libraries > 5 ng/μL with a good peak can proceed directly to pooling.",
          },
        ],
      },
      {
        title: "Optional: Additional Clean-up / Re-PCR",
        ref: "Section 1.5.7",
        steps: [
          {
            id: 10,
            text: "<strong>Large fragment clean-up</strong> (if needed): Use AMPure XP beads at 0.5× first addition and 0.8× second addition. Follows the size selection protocol from NEBNext manual.",
          },
          {
            id: 11,
            text: '<strong>Re-PCR</strong> (if library conc. < 1 ng/μL): Follow NEBNext PCR Enrichment section. Use <strong>Illumina universal PCR primers</strong>. 6 additional cycles typically sufficient. Clean up and re-measure.',
          },
          { id: 12, text: "Store final libraries at <strong>−20 °C</strong> until pooling." },
        ],
      },
    ],
  },
  {
    id: "hybridisation",
    label: "3. Hybridisation",
    title: "Hybridisation & Target Capture",
    timeEstimate: "2 days (24-hour hybridisation incubation)",
    introNote: "Target capture: myBaits Expert Angiosperms 353 v1 + myBaits Custom PhyloPalm baits. RNA baits hybridise to target genomic regions, enriching the library for genes of interest before sequencing.",
    substages: [
      {
        title: "Pooling Libraries",
        ref: "Section 1.6",
        steps: [
          {
            id: 1,
            text: "Group libraries into hybridisation pools of <strong>≤25 libraries each</strong>. Group by: (a) sample material, (b) similar average library fragment size, (c) aim for ≥1 μg total DNA per pool.",
            info: "Grouping by fragment size ensures similar hybridisation kinetics within a pool. The 25-library limit matches bait kit capacity. 1 μg total DNA provides enough target for efficient bait capture.",
            tip: "Calculate per-library contribution: 1000 ng ÷ number of libraries in pool = ng needed from each. Volume = ng needed ÷ library concentration (ng/μL).",
          },
          {
            id: 2,
            text: "Thaw and homogenise libraries. Combine calculated volumes into one labelled tube per pool. Mix by pipetting. Transfer <strong>3 μL</strong> to a PCR strip tube for a genome skimming pool.",
            info: "The 3 μL skimming aliquot goes directly to sequencing without hybridisation, providing low-coverage whole-genome data (plastome, rDNA) that complements the targeted capture data.",
          },
          {
            id: 3,
            text: "Concentrate each hybridisation pool to <strong>7 μL</strong> using Speedvac (or dry completely and resuspend in 7 μL). Store at −20 °C.",
            info: "The hybridisation reaction requires a small, concentrated input volume. 7 μL accommodates the blockers mix and hybridisation buffer volumes in the myBaits protocol.",
          },
        ],
      },
      {
        title: "Hybridisation Set-up (Day 1)",
        ref: "Section 1.7.1",
        steps: [
          {
            id: 4,
            text: "Clean workstation with bleach, Molecular Grade water, and RNaseZap. Thaw hybridisation reagents (Hyb N, Hyb D, Hyb S, Hyb R, Block O, Block X). Thaw baits on ice from −80 °C. Set heat blocks: <strong>65 °C</strong> (96-well plate) and <strong>60 °C</strong> (tubes).",
            info: "RNA baits are susceptible to RNase degradation. RNaseZap treatment eliminates environmental RNases. Baits thaw on ice to minimise degradation. 65 °C is the optimised hybridisation temperature for these bait sets.",
          },
          {
            id: 5,
            text: 'Follow myBaits manual v5.01 "Standard Protocol": set up <strong>Hybridisation Mix</strong>, <strong>Blockers Mix</strong> (use PLANTS blockers), and assemble reactions.',
            info: "Blockers prevent non-specific binding. PLANTS blockers are optimised for repetitive sequences in plant genomes, which would otherwise hybridise non-specifically and reduce capture efficiency.",
          },
          {
            id: 6,
            text: "Add baits: <strong>4.4 μL Angiosperms-353 + 1.1 μL PhyloPalm</strong> per reaction (5.5 μL total). If using heat block without hot lid, add <strong>30 μL liquid wax</strong> on top. Incubate at <strong>65 °C for 24 hours</strong>.",
            info: "The 4:1 ratio of Angiosperms-353 to PhyloPalm baits provides broad angiosperm gene coverage plus palm-specific markers. 24-hour hybridisation at 65 °C ensures thorough capture, even from degraded herbarium DNA. Liquid wax prevents evaporation.",
            tip: "Ensure the wax fully covers the reaction surface. Check that the heat block maintains a stable 65 °C throughout. If using a thermocycler with heated lid, wax is unnecessary.",
          },
        ],
      },
      {
        title: "Bead Binding & Washing (Day 2)",
        ref: "Section 1.7.2",
        steps: [
          {
            id: 7,
            text: "Start <strong>90 min before</strong> ending hybridisation. Prepare Wash Buffer X: (12.12 μL Hyb S + 1.2 mL nuclease-free water + 0.3 mL Wash Buffer) × (reactions + 3). Pre-warm to <strong>65 °C</strong>.",
            info: "Stringent washing at 65 °C removes non-specifically bound DNA while retaining target-bait hybrids. The +3 extra reactions account for pipetting loss and evaporation during warming.",
          },
          {
            id: 8,
            text: 'Follow myBaits manual "Bead Preparation" and "Binding beads and hybrids." If wax was used, pipette reaction through the wax. Transfer ≥26.5 μL of hybridisation reaction to heated bead aliquots.',
            info: "Streptavidin-coated magnetic beads bind to the biotinylated RNA baits. The bait–target DNA hybrids are captured on the beads, while non-target DNA remains in solution and is washed away.",
          },
          {
            id: 9,
            text: "Perform <strong>4 washes</strong> total with pre-warmed Wash Buffer X. After the final wash, do not let beads dry — proceed immediately to amplification.",
            info: "Multiple washes at 65 °C progressively remove non-specifically bound fragments. Not drying the beads prevents the streptavidin–biotin bond from becoming too tight, which would make elution difficult.",
          },
        ],
      },
      {
        title: "Enriched Library Amplification & Clean-up",
        ref: "Section 1.7.3",
        steps: [
          {
            id: 10,
            text: 'Follow myBaits manual "Library Resuspension and Amplification" Workflow B. Split pool: use <strong>15 μL</strong> for PCR, store remainder at −20 °C. Use <strong>Illumina universal PCR primers</strong>. Perform <strong>13 PCR cycles</strong> with step 4 at <strong>30 seconds</strong>.',
            info: "PCR amplifies the captured, enriched library fragments. 13 cycles provides sufficient amplification without excessive PCR duplicates. The shortened extension time (30 s vs 45 s) is appropriate for the fragment sizes produced. Keeping a backup allows re-amplification if needed.",
            tip: "Account for n+1 reactions when calculating PCR master mix volumes. The universal primers work because the libraries already carry their unique dual-index sequences.",
          },
          {
            id: 11,
            text: "Clean PCR product: follow NEBNext clean-up with <strong>45 μL AMPure XP beads (0.9×)</strong>. Elute in <strong>23 μL</strong> for a final volume of 20 μL.",
          },
          {
            id: 12,
            text: "Measure enriched pool concentration (Quantus) and fragment size (TapeStation D1000). Calculate molarity for sequencing preparation.",
          },
        ],
      },
    ],
  },
  {
    id: "sequencing",
    label: "4. Sequencing Prep",
    title: "Molarity Correction & Sequencing Preparation",
    timeEstimate: "~3 hours",
    introNote: "Normalise all enriched pools to the same molarity, then combine them proportionally by sample count into a single sequencing-ready pool.",
    substages: [
      {
        title: "Molarity Calculation & Pooling",
        ref: "Section 1.8",
        steps: [
          {
            id: 1,
            text: "From TapeStation analysis, select a region covering all fragments to get the <strong>integrated average fragment size</strong>. With concentration from Quantus, calculate molarity using the formula below.",
            info: "Molarity normalisation ensures each pool contributes equally to the final sequencing pool. The formula converts mass concentration to molar concentration using 660 Da/bp (average molecular weight of a DNA base pair). Sequencing providers require pools at a specific molarity for optimal cluster generation on the flow cell.",
          },
          {
            id: 2,
            text: "If target molarity (e.g., 8 nM) is not reached, use Speedvac to concentrate, or perform additional PCR cycles, bead clean, and re-measure.",
          },
          {
            id: 3,
            text: "Calculate each pool's share: <code>Share (s) = samples in pool ÷ total samples</code>. Volume: <code>v = final pool volume × s</code>.",
            info: "Proportional pooling based on sample count ensures each individual library is represented equally in the sequencing run.",
          },
          {
            id: 4,
            text: "Normalise all enriched pools to the <strong>same target molarity</strong>. Dilute as needed. Store undiluted remainder at −20 °C.",
          },
          {
            id: 5,
            text: "Combine calculated volumes from each normalised pool into a single tube to create the <strong>final sequencing pool</strong>. Add ~3 μL buffer for quantification and pipetting error.",
          },
          {
            id: 6,
            text: "Measure final sequencing pool concentration (Quantus) and size (TapeStation D1000). Calculate final molarity. Store at <strong>−20 °C</strong> until submission to sequencing provider.",
            info: "Final QC confirms the pool meets the sequencing provider's requirements. Accurate molarity ensures proper cluster density on the flow cell, which directly affects sequencing quality and data yield.",
            tip: "Contact your sequencing provider for their specific molarity and volume requirements before preparing the final pool. For genome skimming pools, aim for at least 0.5 Gbases of sequencing data per sample.",
          },
        ],
      },
    ],
  },
];
