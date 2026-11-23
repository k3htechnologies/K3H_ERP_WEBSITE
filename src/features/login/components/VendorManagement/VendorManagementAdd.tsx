import FilterDropdown from "@/shared/components/FilterDropdown/FilterDropdown"
import { useState } from "react"
import type { VendorManagementFormState } from "../../types/vendorManagement.type"
import InputField from "@/shared/components/InputField/InputField"
import UploadField from "@/shared/components/UploadField/UploadField"
import { validatePhotoFile } from "@/shared/utils"
import { FILE_ISSUE } from "@/shared/constants"
import Modal from "@/shared/components/Modal/Modal"
import { createFormData } from "@/shared/utils/createFormData"
import { VendorManagementFormService } from "../../service/vendorManagementForm"

const VendorManagementAdd = () => {

    const [formData, setFormData] = useState<VendorManagementFormState>({
        vendorType: "",
        vendorName: "",
        companyName: "",
        mobileNumber: "",
        emailId: "",
        companyType: "",
        address: "",
        country: "",
        state: "",
        district: "",
        city: "",
        aadharCardNumber: "",
        aadharCard: "",
        pANCardNumber: "",
        pANCard: "",
        gSTNumber: "",
        gSTCertificate: ""
    })

    const VENDOR_TYPE =
        [
            { label: 'Material', value: 'Material' },
            { label: 'Contractor', value: 'Contractor' },
            { label: 'Both', value: 'Both' },
        ]

    const COMPANY_TYPE =
        [
            { label: 'LLP', value: 'LLP' },
            { label: 'Private Limited Company', value: 'Private Limited Company' },
            { label: 'Proprietorship', value: 'Proprietorship' },
        ]


    const [aadharCardPhoto, setAadharCardPhoto] = useState<File | null>(null);
    const [aadharCardPhotoPreview, setAadharCardPhotoPreview] = useState<string>('');

    const [panCardPhoto, setPanCardPhoto] = useState<File | null>(null);
    const [panCardPhotoPreview, setPanCardPhotoPreview] = useState<string>('');

    const [gstCertificatePhoto, setGstCertificatePhoto] = useState<File | null>(null);
    const [gstCertificatePhotoPreview, setGstCertificatePhotoPreview] = useState<string>('');

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        description: '',
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof VendorManagementFormState | 'aadharCard' | 'panCard' | 'gstCertificate', string>>
    >({});

    const handlePhotoUpload = (file: File) => {
        const isValid = validatePhotoFile(file);
        if (!isValid.status) {
            if (isValid.issue === FILE_ISSUE.FORMAT) {
                setModalState({
                    isOpen: true,
                    title: 'Invalid Image Format',
                    description: 'Only JPG, PNG and WEBP image formats are allowed.',
                });
            } else if (isValid.issue === FILE_ISSUE.SIZE) {
                setModalState({
                    isOpen: true,
                    title: 'Image Too Large',
                    description: 'Please upload an image smaller than 5MB.',
                });
            }
            return;
        }
        setErrors((prev) => ({
            ...prev,
            photo: '',
        }));
        setAadharCardPhoto(file);
        setPanCardPhoto(file);
        setGstCertificatePhoto(file);

        const imageUrl = URL.createObjectURL(file);
        setAadharCardPhotoPreview(imageUrl);
        setPanCardPhotoPreview(imageUrl);
        setGstCertificatePhotoPreview(imageUrl);
    }

    const removePhoto = () => {
        setAadharCardPhoto(null);
        setAadharCardPhotoPreview('');
        setPanCardPhoto(null);
        setPanCardPhotoPreview('');
        setGstCertificatePhoto(null);
        setGstCertificatePhotoPreview('');
    };

    const onModalClose = () => {
        setModalState({
            isOpen: false,
            title: '',
            description: '',
        });
        setFormData({
            vendorType: '',
            vendorName: '',
            companyName: '',
            mobileNumber: '',
            emailId: '',
            companyType: '',
            address: '',
            country: '',
            state: '',
            district: '',
            city: '',
            aadharCardNumber: '',
            aadharCard: '',
            pANCardNumber: '',
            pANCard: '',
            gSTNumber: '',
            gSTCertificate: '',
        });
        removePhoto();
    };

    const handleSubmit = async () => {
        try {
            const request: FormData = createFormData({
                vendorType: formData.vendorType,
                vendorName: formData.vendorName,
                companyName: formData.companyName,
                mobileNumber: formData.mobileNumber,
                emailId: formData.emailId,
                companyType: formData.companyType,
                address: formData.address,
                country: formData.country,
                state: formData.state,
                district: formData.district,
                city: formData.city,
                aadharCardNumber: formData.aadharCardNumber,
                aadharCard: formData.aadharCard,
                pANCardNumber: formData.pANCardNumber,
                pANCard: formData.pANCard,
                gSTNumber: formData.gSTNumber,
                gSTCertificate: formData.gSTCertificate,
            })

            const response = await VendorManagementFormService.apiCallVendorManagementFormSubmit(request);

            if (response && response.IsSuccess) {
                setModalState({
                    isOpen: true,
                    title: 'Form Submitted',
                    description: 'The property details have been submitted successfully.',
                });
            } else {
                setModalState({
                    isOpen: true,
                    title: 'Form Submitted',
                    description: 'The property details have been saved successfully.',
                });
            }
        } catch (error) {
            setModalState({
                isOpen: true,
                title: 'Submission Failed',
                description: 'Something went wrong while submitting the form.',
            });

        }
    }

    return (
        <section className="p-4  md:p-8 bg-white">
            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Basic Details
            </h1>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mt-2">
                    <FilterDropdown
                        label="Vendor Type"
                        name="vendorType"
                        placeholder="Select Vendor Type"
                        theme="light"
                        selectedOption={{
                            label:
                                VENDOR_TYPE.find((b) => b.value === formData.vendorType)?.label ||
                                'Select Existing Building Type',
                            value: formData.vendorType,
                        }}
                        options={VENDOR_TYPE}
                        onChange={(opt) =>
                            setFormData((prev) => ({ ...prev, vendorType: opt.value }))
                        }
                        mandatory={true}
                    />

                </div>

                <div className="-mt-2">
                    <InputField
                        label="Vendor Name"
                        name="vendorName"
                        placeholder="Enter Vendor Name"
                        value={formData.vendorName}
                        onChange={(e) => setFormData(prev => ({ ...prev, vendorName: e.target.value }))}
                        mandatory={true}
                    />
                </div>

                <div className="mt-2">
                    <InputField
                        label="Company Name"
                        name="companyName"
                        placeholder="Enter Company Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        mandatory={true}
                    />
                </div>

                <div>
                    <InputField
                        label="Mobile Number"
                        name="mobileNumber"
                        placeholder="Enter Mobile Number"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                        mandatory={true}
                    />
                </div>

                <div>
                    <InputField
                        label="Email Id"
                        name="emailId"
                        placeholder="Enter Email Id"
                        value={formData.emailId}
                        onChange={(e) => setFormData(prev => ({ ...prev, emailId: e.target.value }))}
                        mandatory={true}
                    />
                </div>

                <div>
                    <FilterDropdown
                        label="Company Type"
                        name="companyType"
                        placeholder="Select Company Type"
                        theme="light"
                        selectedOption={{
                            label:
                                COMPANY_TYPE.find((b) => b.value === formData.companyType)?.label ||
                                'Select Company Type',
                            value: formData.companyType,
                        }}
                        options={COMPANY_TYPE}
                        onChange={(opt) =>
                            setFormData((prev) => ({ ...prev, companyType: opt.value }))
                        }
                        mandatory={true}
                    />
                </div>
            </div>

            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Address Details
            </h1>

            <div>
                <div className="mt-4">
                    <InputField
                        label="Address"
                        name="address"
                        placeholder="Enter Address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        mandatory={true}
                    />

                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FilterDropdown
                        label="Country"
                        name="country"
                        placeholder="Select Country"
                        theme="light"
                        selectedOption={{ label: formData.country || 'India', value: formData.country || 'India' }}
                        options={[{ label: 'India', value: 'India' }]}
                        onChange={(opt) => setFormData(prev => ({ ...prev, country: opt.value }))}
                        mandatory={true}
                    />
                    <FilterDropdown
                        label="State"
                        name="state"
                        placeholder="Select State"
                        theme="light"
                        selectedOption={{ label: formData.state || 'Select State', value: formData.state }}
                        options={[{ label: 'Maharashtra', value: 'Maharashtra' }]}
                        onChange={(opt) => setFormData(prev => ({ ...prev, state: opt.value }))}
                        mandatory={true}
                    />
                    <FilterDropdown
                        label="District"
                        name="district"
                        placeholder="Select District"
                        theme="light"
                        selectedOption={{ label: formData.district || 'Select District', value: formData.district }}
                        options={[{ label: 'Mumbai', value: 'Mumbai' }]}
                        onChange={(opt) => setFormData(prev => ({ ...prev, district: opt.value }))}
                        mandatory={true}
                    />
                    <FilterDropdown
                        label="City"
                        name="city"
                        placeholder="Select City"
                        theme="light"
                        selectedOption={{ label: formData.city || 'Select City', value: formData.city }}
                        options={[{ label: 'Mumbai', value: 'Mumbai' }]}
                        onChange={(opt) => setFormData(prev => ({ ...prev, city: opt.value }))}
                        mandatory={true}
                    />
                </div>
            </div>

            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Government Identifiers
            </h1>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    type="number"
                    label="Aadhar Card Number"
                    name="aadharCardNumber"
                    placeholder="Enter Aadhar Card Number"
                    value={formData.aadharCardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, aadharCardNumber: e.target.value }))}
                    mandatory={true}
                />

                <UploadField
                    label="Aadhar Card"
                    accept="image/*"
                    file={aadharCardPhoto}
                    error={errors.aadharCard}
                    previewUrl={aadharCardPhotoPreview}
                    onUpload={handlePhotoUpload}
                    onRemove={removePhoto}
                    mandatory={true}
                />

                <InputField
                    type="number"
                    label="Pan Card Number"
                    name="panCardNumber"
                    placeholder="Enter Pan Card Number"
                    value={formData.pANCardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, pANCardNumber: e.target.value }))}
                    mandatory={true}
                />

                <UploadField
                    label="Pan Card"
                    accept="image/*"
                    file={panCardPhoto}
                    error={errors.panCard}
                    previewUrl={panCardPhotoPreview}
                    onUpload={handlePhotoUpload}
                    onRemove={removePhoto}
                    mandatory={true}
                />
                <InputField
                    type="number"
                    label="GST Number"
                    name="gstNumber"
                    placeholder="Enter GST Number"
                    value={formData.gSTNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, gSTNumber: e.target.value }))}
                    mandatory={true}
                />
                <UploadField
                    label="GST Certificate"
                    accept="image/*"
                    file={gstCertificatePhoto}
                    error={errors.gSTCertificate}
                    previewUrl={gstCertificatePhotoPreview}
                    onUpload={handlePhotoUpload}
                    onRemove={removePhoto}
                    mandatory={true}
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`mt-5 cursor-pointer h-14 items-center justify-center gap-2 border border-black/10 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-all duration-300 hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40`}>
                    Save
                </button>

                <Modal
                    isOpen={modalState.isOpen}
                    title={modalState.title}
                    description={modalState.description}
                    onClose={() => onModalClose()}
                />
            </div>
        </section>
    )
}
export default VendorManagementAdd