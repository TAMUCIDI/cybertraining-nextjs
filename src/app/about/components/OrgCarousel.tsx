import Image from 'next/image'
import TAMU_Logo from "../../../../public/images/TAMU_Logo.png"
import UIUC_Logo from "../../../../public/images/UIUC_Logo.png"

export default function OrgCarousel() {
    return (
        <div className="carousel carousel-center bg-transparent rounded-box max-w-full space-x-4 p-4">
            <div className="carousel-item">
                <Image
                    src={TAMU_Logo}
                    className="rounded-box max-h-[50vh] max-w-lg object-contain"
                    alt='TAMU_Logo'
                />
            </div>
            <div className="carousel-item">
                <Image
                    src={UIUC_Logo}
                    className="rounded-box max-h-[50vh] max-w-lg object-contain"
                    alt='UIUC_Logo'
                />
            </div>
            
        </div>
    );
}