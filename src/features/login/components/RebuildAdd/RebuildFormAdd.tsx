import { useState } from "react"
import type { RebuildFormState } from '@/features/login/types/rebuild-form.type'
import InputField from "@/shared/components/InputField/InputField"
import FilterDropdown from "@/shared/components/FilterDropdown/FilterDropdown"
import UploadField from "@/shared/components/UploadField/UploadField"
import { validatePhotoFile } from "@/shared/utils"
import { FILE_ISSUE } from "@/shared/constants"
import Modal from "@/shared/components/Modal/Modal"
import { createFormData } from "@/shared/utils/createFormData"
import { RebuildFormService } from "../../service/rebuild-form"

const RebuildFormAdd = () => {

    const [formData, setFormData] = useState<RebuildFormState>({
        buildingName: "",
        country: "",
        state: "",
        district: "",
        city: "",
        pinCode: "",
        subdivisionNumber: "",
        buildingAddress: "",
        wardNumber: "",
        totalPlotArea: "",
        originalConstructionYear: "",
        buildingType: "",
        numberOfExistingFloors: "",
        totalNumberOfExistingFlats: "",
        latituteLongitude: "",
        identificationLocation: "",
        contactPersonName: "",
        contactPersonMobileNumber: "",
        contactPersonEmail_id: "",
        percentageOfMemberInFavour: "",
        typeOfLandTenure: "",
        plotShape: "",
        depthOfPlot: "",
        roadWidth: "",
        numberOfExistingWings: "",
        numberOfFloorPerWing: "",
        totalBuildUpArea: "",
        totalCommonArea: "",
        constructionType: "",
        remarks: "",
        isLiftAvailable: false,
        isFireSafetyProvisionsPresent: false,
        isPlotUnderLitigationOrStayOrders: false,
        isConveyanceDeed: false,
    })

    const BUILDING_TYPES = [
        { label: 'Commercial', value: 'commercial' },
        { label: 'Mixed Use', value: 'mixed_use' },
        { label: 'Residential', value: 'residential' },
    ];

    const LAND_TENURE_OPTIONS = [
        { label: 'Leasehold', value: 'Leasehold' },
        { label: 'Freehold', value: 'Freehold' },
        { label: 'Collectors Land', value: 'Collectors Land' },
        { label: 'MHADA', value: 'MHADA' },
        { label: 'SRA', value: 'SRA' },
        { label: 'BMC', value: 'BMC' },
        { label: 'Builder', value: 'Builder' }
    ]
    const PLOT_SHAPE = [
        { label: "Rectangular", value: "Rectangular" },
        { label: "Irregular", value: "Irregular" },
        { label: "L - Shape", value: "L - Shape" },
        { label: "Circle", value: "Circle" }
    ]
    const ROAD_WIDTH = [
        { label: "6.10 M", value: "6.10 M" },
        { label: "9.15 M", value: "9.15 M" },
        { label: "12.20 M", value: "12.20 M" },
        { label: "13.40 M", value: "13.40 M" },
        { label: "18.3 M", value: "18.3 M" },
        { label: "27.45 M", value: "27.45 M" },
        { label: "36.6 M", value: "36.6 M" }
    ]

    const CONSTRUCTION_TYPE = [
        { label: "RCC", value: "RCC" },
        { label: "Load - Bearing", value: "Load - Bearing" }
    ]

    const [buildingPhoto, setBuildingPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>('');

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        description: '',
    });
    const [errors, setErrors] = useState<
        Partial<Record<keyof RebuildFormState | 'photo' | 'resume', string>>
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
        setBuildingPhoto(file);
        const imageUrl = URL.createObjectURL(file);
        setPhotoPreview(imageUrl);
    };

    const removePhoto = () => {
        setBuildingPhoto(null);
        setPhotoPreview('');
    };

    const onModalClose = () => {
        setModalState({
            isOpen: false,
            title: '',
            description: '',
        });
        setFormData({
            buildingName: "",
            country: "",
            state: "",
            district: "",
            city: "",
            pinCode: "",
            subdivisionNumber: "",
            buildingAddress: "",
            wardNumber: "",
            totalPlotArea: "",
            originalConstructionYear: "",
            buildingType: "",
            numberOfExistingFloors: "",
            totalNumberOfExistingFlats: "",
            latituteLongitude: "",
            identificationLocation: "",
            contactPersonName: "",
            contactPersonMobileNumber: "",
            contactPersonEmail_id: "",
            percentageOfMemberInFavour: "",
            typeOfLandTenure: "",
            plotShape: "",
            depthOfPlot: "",
            roadWidth: "",
            numberOfExistingWings: "",
            numberOfFloorPerWing: "",
            totalBuildUpArea: "",
            totalCommonArea: "",
            constructionType: "",
            remarks: "",
            isLiftAvailable: false,
            isFireSafetyProvisionsPresent: false,
            isPlotUnderLitigationOrStayOrders: false,
            isConveyanceDeed: false,

        });
        removePhoto();
    };

    const handleSubmit = async () => {
        try {
            const request: FormData = createFormData({
                BuildingName: formData.buildingName,
                Country: formData.country,
                State: formData.state,
                District: formData.district,
                City: formData.city,
                PinCode: formData.pinCode,
                SubdivisionNumber: formData.subdivisionNumber,
                BuildingAddress: formData.buildingAddress,
                WardNumber: formData.wardNumber,
                TotalPlotArea: formData.totalPlotArea,
                OriginalConstructionYear: formData.originalConstructionYear,
                BuildingType: formData.buildingType,
                NumberOfExistingFloors: formData.numberOfExistingFloors,
                TotalNumberOfExistingFlats: formData.totalNumberOfExistingFlats,
                LatituteLongitude: formData.latituteLongitude,
                IdentificationLocation: formData.identificationLocation,
                ContactPersonName: formData.contactPersonName,
                ContactPersonMobileNumber: formData.contactPersonMobileNumber,
                ContactPersonEmail_id: formData.contactPersonEmail_id,
                PercentageOfMemberInFavour: formData.percentageOfMemberInFavour,
                TypeOfLandTenure: formData.typeOfLandTenure,
                PlotShape: formData.plotShape,
                DepthOfPlot: formData.depthOfPlot,
                RoadWidth: formData.roadWidth,
                NumberOfExistingWings: formData.numberOfExistingWings,
                NumberOfFloorPerWing: formData.numberOfFloorPerWing,
                TotalBuildUpArea: formData.totalBuildUpArea,
                TotalCommonArea: formData.totalCommonArea,
                ConstructionType: formData.constructionType,
                Remarks: formData.remarks,
                IsLiftAvailable: formData.isLiftAvailable,
                IsFireSafetyProvisionsPresent: formData.isFireSafetyProvisionsPresent,
                IsPlotUnderLitigationOrStayOrders: formData.isPlotUnderLitigationOrStayOrders,
                IsConveyanceDeed: formData.isConveyanceDeed,
                BuildingPhoto: buildingPhoto,
            });

            const response = await RebuildFormService.apiCallRebuildFormSubmit(request);

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
    };

    return (
        <section className="p-4  md:p-8 bg-white">
            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Redevelopement: Property Details
            </h1>
            <div className="mt-4">
                <InputField
                    label="Building Name"
                    name="buildingName"
                    placeholder="Enter Building Name"
                    value={formData.buildingName}
                    onChange={(e) => setFormData(prev => ({ ...prev, buildingName: e.target.value }))}
                    mandatory={true}
                />
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

                    <InputField
                        label="Pin Code"
                        name="pinCode"
                        placeholder="Enter Pin Code"
                        value={formData.pinCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, pinCode: e.target.value }))}
                        mandatory={true}
                    />

                    <InputField
                        label="Plot / CTS / Survey / Subdivision Number"
                        name="subdivisionNumber"
                        placeholder="Enter Plot Number"
                        value={formData.subdivisionNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, subdivisionNumber: e.target.value }))}
                        mandatory={true}
                    />

                    <UploadField
                        label="Building Photograph"
                        accept="image/*"
                        file={buildingPhoto}
                        error={errors.photo}
                        previewUrl={photoPreview}
                        onUpload={handlePhotoUpload}
                        onRemove={removePhoto}
                        mandatory={true}
                    />

                    <InputField
                        label="Building Address"
                        name="buildingAddress"
                        placeholder="Enter Building Address"
                        value={formData.buildingAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, buildingAddress: e.target.value }))}
                        mandatory={true}
                    />

                </div>
            </div>
            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Plot Information
            </h1>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Ward Number / Zone"
                    name="wardNumber"
                    placeholder="Enter Ward Number / Zone"
                    value={formData.wardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, wardNumber: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Total Plot Area (sq. mt.)"
                    name="totalPlotArea"
                    placeholder="Enter Total Plot Area"
                    value={formData.totalPlotArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalPlotArea: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Year Of Original Construction"
                    name="yearOfOriginalConstruction"
                    placeholder="Enter Year Of Original Construction"
                    value={formData.originalConstructionYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalPlotArea: e.target.value }))}
                    mandatory={true}
                />
                <FilterDropdown
                    label="Existing Building Type"
                    name="buildingType"
                    placeholder="Select Existing Building Type"
                    theme="light"
                    selectedOption={{
                        label:
                            BUILDING_TYPES.find((b) => b.value === formData.buildingType)?.label ||
                            'Select Existing Building Type',
                        value: formData.buildingType,
                    }}
                    options={BUILDING_TYPES}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, buildingType: opt.value }))
                    }
                    mandatory={true}
                />
                <InputField
                    label="Number Of Existing Floors"
                    name="numberOfExistingFloors"
                    placeholder="Enter Number Of Existing Floors"
                    value={formData.numberOfExistingFloors}
                    onChange={(e) => setFormData(prev => ({ ...prev, numberOfExistingFloors: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Total Number Of Existing Flats"
                    name="totalNumberOfExistingFlats"
                    placeholder="Enter Total Number Of Existing Flats"
                    value={formData.totalNumberOfExistingFlats}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalNumberOfExistingFlats: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Latitude & Longitude"
                    name="latituteLongitude"
                    placeholder="Enter Latitude & Longitude"
                    value={formData.latituteLongitude}
                    onChange={(e) => setFormData(prev => ({ ...prev, latituteLongitude: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Identification Location (For GIS Mapping)"
                    name="identificationLocation"
                    placeholder="Enter Identification Location"
                    value={formData.identificationLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, identificationLocation: e.target.value }))}
                    mandatory={true}
                />
            </div>

            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Contact Information
            </h1>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">

                <InputField
                    label="Contact Person Name"
                    name="contactPersonName"
                    placeholder="Enter Contact Person Name"
                    value={formData.contactPersonName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPersonName: e.target.value }))}
                    mandatory={true}
                />

                <InputField
                    label="Contact Person Mobile Number"
                    name="contactPersonMobileNumber"
                    placeholder="Enter Contact Person Mobile Number"
                    value={formData.contactPersonMobileNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPersonMobileNumber: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Contact Person Email-Id"
                    name="contactPersonEmail_id"
                    placeholder="Enter Contact Person Email-Id"
                    value={formData.contactPersonEmail_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPersonEmail_id: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Percentage Of Member In Favour (%)"
                    name="percentageOfMemberInFavour"
                    placeholder="Enter Percentage Of Member In Favour (%)"
                    value={formData.percentageOfMemberInFavour}
                    onChange={(e) => setFormData(prev => ({ ...prev, percentageOfMemberInFavour: e.target.value }))}
                    mandatory={true}
                />
            </div>
            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Land & Plot Characteristics
            </h1>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FilterDropdown
                    label="Type Of Land Tenure"
                    name="typeOfLandTenure"
                    placeholder="Select Type Of Land Tenure"
                    theme="light"
                    selectedOption={{
                        label: formData.typeOfLandTenure || 'Select Type Of Land Tenure',
                        value: formData.typeOfLandTenure,
                    }}
                    options={LAND_TENURE_OPTIONS}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, typeOfLandTenure: opt.value }))
                    }
                    mandatory={true}
                />
                <FilterDropdown
                    label="Plot Shape"
                    name="plotShape"
                    placeholder="Select Plot Shape"
                    theme="light"
                    selectedOption={{
                        label: formData.plotShape || 'Select Plot Shape',
                        value: formData.plotShape,
                    }}
                    options={PLOT_SHAPE}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, typeOfLandTenure: opt.value }))
                    }
                    mandatory={true}
                />
                <InputField
                    label="Depth Of Plot"
                    name="depthOfPlot"
                    placeholder="Enter Depth Of Plot"
                    value={formData.depthOfPlot}
                    onChange={(e) => setFormData(prev => ({ ...prev, depthOfPlot: e.target.value }))}
                    mandatory={true}
                />
                <FilterDropdown
                    label="Road Width"
                    name="roadWidth"
                    placeholder="Select Road Width"
                    theme="light"
                    selectedOption={{
                        label: formData.roadWidth || 'Select Road Width',
                        value: formData.roadWidth,
                    }}
                    options={ROAD_WIDTH}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, typeOfLandTenure: opt.value }))
                    }
                    mandatory={true}
                />
            </div>
            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Building Structure
            </h1>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Number Of Existing Building/Wings"
                    name="numberOfExistingWings"
                    placeholder="Enter Number Of Existing Building/Wings"
                    value={formData.numberOfExistingWings}
                    onChange={(e) => setFormData(prev => ({ ...prev, numberOfExistingWings: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Number Of Floor Per Wings"
                    name="numberOfFloorPerWing"
                    placeholder="Enter Number Of Floor Per Wing"
                    value={formData.numberOfFloorPerWing}
                    onChange={(e) => setFormData(prev => ({ ...prev, numberOfFloorPerWing: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Total Build-Up Area (Sq.Ft)"
                    name="totalBuildUpArea"
                    placeholder="Enter Total Build-Up Area (Sq.Ft)"
                    value={formData.totalBuildUpArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalBuildUpArea: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Total Carpet Area (Sq.Ft)"
                    name="totalCarpetArea"
                    placeholder="Enter Total Carpet Area (Sq.Ft)"
                    value={formData.totalBuildUpArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalBuildUpArea: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Total Common Area (Sq.Ft)"
                    name="totalCommonArea"
                    placeholder="Enter Total Common Area (Sq.Ft)"
                    value={formData.totalCommonArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalCommonArea: e.target.value }))}
                    mandatory={true}
                />
                <FilterDropdown
                    label="Construction Type"
                    name="constructionType"
                    placeholder="Select Construction Type"
                    theme="light"
                    selectedOption={{
                        label: formData.constructionType || 'Select Construction Type',
                        value: formData.constructionType,
                    }}
                    options={CONSTRUCTION_TYPE}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, typeOfLandTenure: opt.value }))
                    }
                    mandatory={true}
                />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isLiftAvailable || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isLiftAvailable: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Lift Available?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isFireSafetyProvisionsPresent || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFireSafetyProvisionsPresent: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Fire Safety Provisions Present?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isPlotUnderLitigationOrStayOrders || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPlotUnderLitigationOrStayOrders: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Plot Under Litigation / Stay Orders?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isConveyanceDeed || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isConveyanceDeed: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Conveyance Deed?
                </label>
            </div>
            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Additional Information
            </h1>
            <div className="text-lg text-text md:text-lg mt-5">
                <InputField
                    label="Remarks"
                    name="remarks"
                    placeholder="Enter Remarks"
                    value={formData.remarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                    mandatory={true}
                />
            </div>
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
        </section>

    )
}

export default RebuildFormAdd