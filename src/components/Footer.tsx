const Footer = () => (
    <footer className="px-5 md:px-7 pb-8 pt-4">
        <div className="border-t border-line pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mono-label">
            <span>&copy; {new Date().getFullYear()} Sitt Min Thar</span>
            <span>Ho Chi Minh City, Vietnam</span>
            <a href="#top" className="inline-block py-3 -my-3 hover:text-fg transition-colors w-fit">
                Back to top &uarr;
            </a>
        </div>
    </footer>
);

export default Footer;
