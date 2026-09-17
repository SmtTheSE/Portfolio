/** Label bar matching the intro page: bold label over a hairline, spanning the content column. */
const SectionHeader = ({ label }: { label: string }) => (
    <div className="w-full self-stretch h-[52px] flex items-center border-b border-[#C7C7CC] mb-10 md:mb-14">
        <h2 className="text-[17px] md:text-[21px] font-semibold tracking-tight text-text-main">{label}</h2>
    </div>
);

export default SectionHeader;
