/** Sub-heading used inside the Lab: a light title over a hairline. */
const SectionHeader = ({ label }: { label: string }) => (
    <div className="flex items-baseline justify-between border-b border-line pb-3 mb-8 md:mb-10">
        <h2 className="text-[22px] md:text-[26px] font-light tracking-[-0.03em] text-fg">{label}</h2>
    </div>
);

export default SectionHeader;
