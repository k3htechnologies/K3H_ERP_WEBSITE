
import { useEffect, useMemo, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

interface CountryCode {
    name: string;
    code: string;
    countryCode: string;
    mobileLength: number;
    regex?: RegExp;
}

interface MobileNumberInputProps {
    label?: string;
    mobileNumber: string;
    onMobileChange: (value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
}

const countries: CountryCode[] = [
    { name: "Afghanistan", code: "+93", countryCode: "AF", mobileLength: 9, regex: /^\d{9}$/ },
    { name: "Albania", code: "+355", countryCode: "AL", mobileLength: 9, regex: /^\d{9}$/ },
    { name: "Algeria", code: "+213", countryCode: "DZ", mobileLength: 9 },
    { name: "Andorra", code: "+376", countryCode: "AD", mobileLength: 6 },
    { name: "Angola", code: "+244", countryCode: "AO", mobileLength: 9 },
    { name: "Argentina", code: "+54", countryCode: "AR", mobileLength: 10 },
    { name: "Armenia", code: "+374", countryCode: "AM", mobileLength: 8 },
    { name: "Australia", code: "+61", countryCode: "AU", mobileLength: 9 },
    { name: "Austria", code: "+43", countryCode: "AT", mobileLength: 10 },
    { name: "Azerbaijan", code: "+994", countryCode: "AZ", mobileLength: 9 },
    { name: "Bahrain", code: "+973", countryCode: "BH", mobileLength: 8 },
    { name: "Bangladesh", code: "+880", countryCode: "BD", mobileLength: 10 },
    { name: "Belarus", code: "+375", countryCode: "BY", mobileLength: 9 },
    { name: "Belgium", code: "+32", countryCode: "BE", mobileLength: 9 },
    { name: "Bhutan", code: "+975", countryCode: "BT", mobileLength: 8 },
    { name: "Bolivia", code: "+591", countryCode: "BO", mobileLength: 8 },
    { name: "Bosnia and Herzegovina", code: "+387", countryCode: "BA", mobileLength: 8 },
    { name: "Botswana", code: "+267", countryCode: "BW", mobileLength: 8 },
    { name: "Brazil", code: "+55", countryCode: "BR", mobileLength: 11 },
    { name: "Brunei", code: "+673", countryCode: "BN", mobileLength: 7 },
    { name: "Bulgaria", code: "+359", countryCode: "BG", mobileLength: 9 },
    { name: "Cambodia", code: "+855", countryCode: "KH", mobileLength: 9 },
    { name: "Cameroon", code: "+237", countryCode: "CM", mobileLength: 9 },
    { name: "Canada", code: "+1", countryCode: "CA", mobileLength: 10 },
    { name: "Chile", code: "+56", countryCode: "CL", mobileLength: 9 },
    { name: "China", code: "+86", countryCode: "CN", mobileLength: 11 },
    { name: "Colombia", code: "+57", countryCode: "CO", mobileLength: 10 },
    { name: "Costa Rica", code: "+506", countryCode: "CR", mobileLength: 8 },
    { name: "Croatia", code: "+385", countryCode: "HR", mobileLength: 9 },
    { name: "Cyprus", code: "+357", countryCode: "CY", mobileLength: 8 },
    { name: "Czech Republic", code: "+420", countryCode: "CZ", mobileLength: 9 },
    { name: "Denmark", code: "+45", countryCode: "DK", mobileLength: 8 },
    { name: "Dominican Republic", code: "+1", countryCode: "DO", mobileLength: 10 },
    { name: "Egypt", code: "+20", countryCode: "EG", mobileLength: 10 },
    { name: "Estonia", code: "+372", countryCode: "EE", mobileLength: 8 },
    { name: "Ethiopia", code: "+251", countryCode: "ET", mobileLength: 9 },
    { name: "Finland", code: "+358", countryCode: "FI", mobileLength: 10 },
    { name: "France", code: "+33", countryCode: "FR", mobileLength: 9 },
    { name: "Georgia", code: "+995", countryCode: "GE", mobileLength: 9 },
    { name: "Germany", code: "+49", countryCode: "DE", mobileLength: 11 },
    { name: "Ghana", code: "+233", countryCode: "GH", mobileLength: 9 },
    { name: "Greece", code: "+30", countryCode: "GR", mobileLength: 10 },
    { name: "Hong Kong", code: "+852", countryCode: "HK", mobileLength: 8 },
    { name: "Hungary", code: "+36", countryCode: "HU", mobileLength: 9 },
    { name: "Iceland", code: "+354", countryCode: "IS", mobileLength: 7 },
    { name: "India", code: "+91", countryCode: "IN", mobileLength: 10, regex: /^[6-9]\d{9}$/ },
    { name: "Indonesia", code: "+62", countryCode: "ID", mobileLength: 11 },
    { name: "Iran", code: "+98", countryCode: "IR", mobileLength: 10 },
    { name: "Iraq", code: "+964", countryCode: "IQ", mobileLength: 10 },
    { name: "Ireland", code: "+353", countryCode: "IE", mobileLength: 9 },
    { name: "Israel", code: "+972", countryCode: "IL", mobileLength: 9 },
    { name: "Italy", code: "+39", countryCode: "IT", mobileLength: 10 },
    { name: "Japan", code: "+81", countryCode: "JP", mobileLength: 10 },
    { name: "Jordan", code: "+962", countryCode: "JO", mobileLength: 9 },
    { name: "Kazakhstan", code: "+7", countryCode: "KZ", mobileLength: 10 },
    { name: "Kenya", code: "+254", countryCode: "KE", mobileLength: 9 },
    { name: "Kuwait", code: "+965", countryCode: "KW", mobileLength: 8 },
    { name: "Lebanon", code: "+961", countryCode: "LB", mobileLength: 8 },
    { name: "Luxembourg", code: "+352", countryCode: "LU", mobileLength: 9 },
    { name: "Malaysia", code: "+60", countryCode: "MY", mobileLength: 10 },
    { name: "Maldives", code: "+960", countryCode: "MV", mobileLength: 7 },
    { name: "Mexico", code: "+52", countryCode: "MX", mobileLength: 10 },
    { name: "Morocco", code: "+212", countryCode: "MA", mobileLength: 9 },
    { name: "Myanmar", code: "+95", countryCode: "MM", mobileLength: 9 },
    { name: "Nepal", code: "+977", countryCode: "NP", mobileLength: 10 },
    { name: "Netherlands", code: "+31", countryCode: "NL", mobileLength: 9 },
    { name: "New Zealand", code: "+64", countryCode: "NZ", mobileLength: 9 },
    { name: "Nigeria", code: "+234", countryCode: "NG", mobileLength: 10 },
    { name: "Norway", code: "+47", countryCode: "NO", mobileLength: 8 },
    { name: "Oman", code: "+968", countryCode: "OM", mobileLength: 8 },
    { name: "Pakistan", code: "+92", countryCode: "PK", mobileLength: 10, regex: /^3\d{9}$/ },
    { name: "Philippines", code: "+63", countryCode: "PH", mobileLength: 10 },
    { name: "Poland", code: "+48", countryCode: "PL", mobileLength: 9 },
    { name: "Portugal", code: "+351", countryCode: "PT", mobileLength: 9 },
    { name: "Qatar", code: "+974", countryCode: "QA", mobileLength: 8 },
    { name: "Romania", code: "+40", countryCode: "RO", mobileLength: 9 },
    { name: "Russia", code: "+7", countryCode: "RU", mobileLength: 10 },
    { name: "Saudi Arabia", code: "+966", countryCode: "SA", mobileLength: 9, regex: /^5\d{8}$/ },
    { name: "Singapore", code: "+65", countryCode: "SG", mobileLength: 8 },
    { name: "South Africa", code: "+27", countryCode: "ZA", mobileLength: 9 },
    { name: "South Korea", code: "+82", countryCode: "KR", mobileLength: 10 },
    { name: "Spain", code: "+34", countryCode: "ES", mobileLength: 9 },
    { name: "Sri Lanka", code: "+94", countryCode: "LK", mobileLength: 9 },
    { name: "Sweden", code: "+46", countryCode: "SE", mobileLength: 9 },
    { name: "Switzerland", code: "+41", countryCode: "CH", mobileLength: 9 },
    { name: "Taiwan", code: "+886", countryCode: "TW", mobileLength: 9 },
    { name: "Thailand", code: "+66", countryCode: "TH", mobileLength: 9 },
    { name: "Turkey", code: "+90", countryCode: "TR", mobileLength: 10 },
    { name: "Ukraine", code: "+380", countryCode: "UA", mobileLength: 9 },
    { name: "United Arab Emirates", code: "+971", countryCode: "AE", mobileLength: 9, regex: /^5\d{8}$/ },
    { name: "United Kingdom", code: "+44", countryCode: "GB", mobileLength: 10, regex: /^\d{10}$/ },
    { name: "United States", code: "+1", countryCode: "US", mobileLength: 10, regex: /^\d{10}$/ },
    { name: "Uruguay", code: "+598", countryCode: "UY", mobileLength: 8 },
    { name: "Uzbekistan", code: "+998", countryCode: "UZ", mobileLength: 9 },
    { name: "Vietnam", code: "+84", countryCode: "VN", mobileLength: 9 },
    { name: "Yemen", code: "+967", countryCode: "YE", mobileLength: 9 },
    { name: "Zimbabwe", code: "+263", countryCode: "ZW", mobileLength: 9 },
];

const CountryFlag = ({ countryCode }: { countryCode: string }) => (
    <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{ width: "18px", height: "18px" }}
        title={countryCode}
    />
);

const MobileNumberInput = ({
    label = "Mobile Number",
    mobileNumber,
    onMobileChange,
    error,
    required = false,
    disabled = false,
}: MobileNumberInputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedCountry = useMemo(() => {
        return [...countries]
            .sort((a, b) => b.code.length - a.code.length)
            .find(country => mobileNumber.startsWith(country.code))
            ?? countries.find(country => country.countryCode === "IN")!;
    }, [mobileNumber]);

    const handleMobileChange = (value: string) => {
        const numbersOnly = value.replace(/\D/g, "");

        onMobileChange(
            `${selectedCountry.code} ${numbersOnly.slice(0, selectedCountry.mobileLength)}`
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full">
            <label className="mb-2 block text-montserrat text-[11px] font-semibold uppercase tracking-widest text-primary-sub">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            <div
                className={`flex h-14 w-full items-center border-b bg-transparent transition-all duration-300 ${error
                    ? "border-red-400"
                    : "border-black/10 focus-within:border-primary"
                    } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            >
                <div
                    ref={dropdownRef}
                    className="relative flex h-full shrink-0 items-center border-r border-black/10"
                >
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex h-full w-[130px] items-center gap-2 px-3 text-sm font-medium text-text outline-none disabled:cursor-not-allowed"
                    >
                        <CountryFlag countryCode={selectedCountry.countryCode} />
                        <span>{selectedCountry.countryCode} {selectedCountry.code}</span>

                        <svg
                            className={`ml-auto h-3 w-3 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""
                                }`}
                            viewBox="0 0 12 12"
                            fill="none"
                        >
                            <path
                                d="M2 4L6 8L10 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {isOpen && !disabled && (
                        <div className="flex-1 absolute left-0 top-full z-50 mt-1 h-40 w-[130px] overflow-y-auto overflow-x-auto thin-scroll rounded-md border border-gray-200 bg-white shadow-lg">
                            {countries.map((country) => (
                                <button
                                    key={country.countryCode}
                                    type="button"
                                    onClick={() => {
                                        const phoneNumber = mobileNumber
                                            .startsWith(selectedCountry.code)
                                            ? mobileNumber.slice(selectedCountry.code.length).trim()
                                            : "";
                                        onMobileChange(`${country.code} ${phoneNumber}`);
                                        setIsOpen(false);
                                    }}
                                    className={`flex w-[90px] items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${selectedCountry.countryCode === country.countryCode
                                        ? "bg-gray-100"
                                        : ""
                                        }`}
                                >
                                    <CountryFlag countryCode={country.countryCode} />
                                    <span className="flex-1">{country.countryCode}</span>
                                    <span className="text-gray-500">{country.code}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="tel"
                    value={
                        mobileNumber.startsWith(selectedCountry.code)
                            ? mobileNumber.slice(selectedCountry.code.length).trim()
                            : ""
                    }
                    disabled={disabled}
                    maxLength={selectedCountry.mobileLength}
                    placeholder="Enter mobile number"
                    onChange={(e) => handleMobileChange(e.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-text outline-none placeholder:text-[#B8BCC2] disabled:cursor-not-allowed"
                />

                <svg
                    className="mr-3 h-5 w-5 shrink-0 text-primary-sub"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.06 8.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 0 2.11-.45c.89.34 1.83.58 2.79.7A2 2 0 0 1 22 16.92z" />
                </svg>
            </div>

            {error && (
                <p className="mt-2 text-xs font-medium text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default MobileNumberInput;
