import { FC } from 'react';

const Footer: FC = () => (
    <footer className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="text-center text-sm text-muted-foreground">
                <p>&copy; 2024 Computer Shop. All rights reserved.</p>
            </div>
            <nav className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
            </nav>
        </div>
    </footer>
);

export default Footer;
