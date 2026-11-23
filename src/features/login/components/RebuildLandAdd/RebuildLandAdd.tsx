import { useState } from "react";
import type { RebuildLandFormState } from "../../types/rebuildLand.type";
import InputField from "@/shared/components/InputField/InputField";
import FilterDropdown from "@/shared/components/FilterDropdown/FilterDropdown";
import UploadField from "@/shared/components/UploadField/UploadField";
import { validatePhotoFile } from "@/shared/utils";
import { FILE_ISSUE } from "@/shared/constants";
import Modal from "@/shared/components/Modal/Modal";
import { createFormData } from "@/shared/utils/createFormData";
import { RebuildLandAddFormService } from "../../service/rebuild-land-form";

const initialFormData: RebuildLandFormState = {
    landOwnerName: "",
    country: "",
    state: "",
    district: "",
    city: "",
    pinCode: "",
    subdivisionNumber: "",
    landAddress: "",
    wardNumber: "",
    totalPlotArea: "",
    latituteLongitude: "",
    identificationLocation: "",
    contactPersonName: "",
    contactPersonMobileNumber: "",
    contactPersonEmail_id: "",
    typeOfLandTenure: "",
    plotShape: "",
    depthOfPlot: "",
    roadWidth: "",
    soilType: "",
    existingGroundConditions: "",
    fsiPermissible: "",
    waterTypeSupply: "",
    surroundingLandUse: "",
    landOwnerShipType: "",
    distanceFromNearestTown: "",
    distanceFromHighway: "",
    distanceFromRailwayStation: "",
    distanceFromAirport: "",
    totalNumberOfTreesOnSite: "",
    isPowerOfAttorneyInvolved: false,
    isFencingBoundaryWallPresent: false,
    isLandConvertedToNonAgriculture: false,
    isAvailabilityOfAccessRoad: false,
    isElectricityConnectionNearby: false,
    isPlotUnderLitigationOrder: false,
    isSevenByTwelve: false,
    remarks: "",

};

const RebuildLandAdd = () => {




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

    const soilType = [
        { label: "Clay", value: "Clay" },
        { label: "Black Cotton", value: "Black Cotton" },
        { label: "Sandy", value: "Sandy" },
        { label: "Rocky", value: "Rocky" },
    ]

    const existingGroundConditions = [
        { label: "Vacant", value: "Vacant" },
        { label: "Barren", value: "Barren" },
        { label: "Vegetation", value: "Vegetation" },
        { label: "Encroachements", value: "Encroachements" },
    ]

    const waterSupplyAvailable = [
        { label: "Borewell", value: "Borewell" },
        { label: "Municipal", value: "Municipal" },
    ]

    const surroundingLandUse = [
        { label: "Agricultural", value: "Agricultural" },
        { label: "Residential", value: "Residential" },
        { label: "Industrial", value: "Industrial" },
        { label: "Vacant", value: "Vacant" },
    ]

    const landTenureType = [
        { label: "Leasehold", value: "Leasehold" },
        { label: "Freehold", value: "Freehold" },
        { label: "Collectors Land", value: "Collectors Land" },
        { label: "MHADA", value: "MHADA" },
        { label: "SRA", value: "SRA" },
        { label: "BMC", value: "BMC" },
        { label: "Builder", value: "Builder" },
    ]


    const landOwnerShipType = [
        { label: "Individual", value: "Individual" },
        { label: "Joint", value: "Joint" },
        { label: "Trust", value: "Trust" },
        { label: "Company", value: "Company" },
        { label: "Government", value: "Government" },
        { label: "Society", value: "Society" },
    ]

    const [formData, setFormData] = useState<RebuildLandFormState>(initialFormData);

    const [buildingPhoto, setBuildingPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>('');

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        description: '',
    });
    const [errors, setErrors] = useState<
        Partial<Record<keyof RebuildLandFormState | 'photo' | 'resume', string>>
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

            landOwnerName: "",
            country: "",
            state: "",
            district: "",
            city: "",
            pinCode: "",
            subdivisionNumber: "",
            landAddress: "",
            wardNumber: "",
            totalPlotArea: "",
            latituteLongitude: "",
            identificationLocation: "",
            contactPersonName: "",
            contactPersonMobileNumber: "",
            contactPersonEmail_id: "",
            typeOfLandTenure: "",
            plotShape: "",
            depthOfPlot: "",
            roadWidth: "",
            soilType: "",
            existingGroundConditions: "",
            fsiPermissible: "",
            waterTypeSupply: "",
            surroundingLandUse: "",
            landOwnerShipType: "",
            distanceFromNearestTown: "",
            distanceFromHighway: "",
            distanceFromRailwayStation: "",
            distanceFromAirport: "",
            totalNumberOfTreesOnSite: "",
            isPowerOfAttorneyInvolved: false,
            isFencingBoundaryWallPresent: false,
            isLandConvertedToNonAgriculture: false,
            isAvailabilityOfAccessRoad: false,
            isElectricityConnectionNearby: false,
            isPlotUnderLitigationOrder: false,
            isSevenByTwelve: false,
            remarks: "",

        });
        removePhoto();
        // navigate(`/${ROUTES.CAREER}`);
    };

    const handleSubmit = async () => {
        try {
            const request: FormData = createFormData({
                LandOwnerName: formData.landOwnerName,
                Country: formData.country,
                State: formData.state,
                District: formData.district,
                City: formData.city,
                PinCode: formData.pinCode,
                SubdivisionNumber: formData.subdivisionNumber,
                LandAddress: formData.landAddress,
                WardNumber: formData.wardNumber,
                TotalPlotArea: formData.totalPlotArea,
                LatituteLongitude: formData.latituteLongitude,
                IdentificationLocation: formData.identificationLocation,
                ContactPersonName: formData.contactPersonName,
                ContactPersonMobileNumber: formData.contactPersonMobileNumber,
                ContactPersonEmail_id: formData.contactPersonEmail_id,
                TypeOfLandTenure: formData.typeOfLandTenure,
                PlotShape: formData.plotShape,
                DepthOfPlot: formData.depthOfPlot,
                RoadWidth: formData.roadWidth,
                SoilType: formData.soilType,
                ExistingGroundConditions: formData.existingGroundConditions,
                FsiPermissible: formData.fsiPermissible,
                WaterTypeSupply: formData.waterTypeSupply,
                SurroundingLandUse: formData.surroundingLandUse,
                LandOwnerShipType: formData.landOwnerShipType,
                DistanceFromNearestTown: formData.distanceFromNearestTown,
                DistanceFromHighway: formData.distanceFromHighway,
                DistanceFromRailwayStation: formData.distanceFromRailwayStation,
                DistanceFromAirport: formData.distanceFromAirport,
                TotalNumberOfTreesOnSite: formData.totalNumberOfTreesOnSite,
                IsPowerOfAttorneyInvolved: formData.isPowerOfAttorneyInvolved,
                IsFencingBoundaryWallPresent: formData.isFencingBoundaryWallPresent,
                IsLandConvertedToNonAgriculture: formData.isLandConvertedToNonAgriculture,
                IsAvailabilityOfAccessRoad: formData.isAvailabilityOfAccessRoad,
                IsElectricityConnectionNearby: formData.isElectricityConnectionNearby,
                IsPlotUnderLitigationOrder: formData.isPlotUnderLitigationOrder,
                IsSevenByTwelve: formData.isSevenByTwelve,
                Remarks: formData.remarks,
                BuildingPhoto: buildingPhoto,


            });
            const response = await RebuildLandAddFormService.apiCallRebuildLandAddFormSubmit(request);
            console.log('rebuild land add response ---->', response)

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
                Redevelopement: Property Details
            </h1>
            <div className="mt-4">
                <InputField
                    label="Land Owner Name"
                    name="landOwnerName"
                    placeholder="Enter Land Owner Name"
                    value={formData.landOwnerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, landOwnerName: e.target.value }))}
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
                        label="Land Address"
                        name="landAddress"
                        placeholder="Enter Land Address"
                        value={formData.landAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, landAddress: e.target.value }))}
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

            </div>
            <h1 className="text-lg text-text md:text-lg mt-5 border-b pb-2 border-slate-200 font-semibold">
                Land & Plot Characteristics
            </h1>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">

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
                        setFormData((prev) => ({ ...prev, plotShape: opt.value }))
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
                        setFormData((prev) => ({ ...prev, roadWidth: opt.value }))
                    }
                    mandatory={true}
                />

                <FilterDropdown
                    label="Soil Type"
                    name="soilType"
                    placeholder="Select Soil Type"
                    theme="light"
                    selectedOption={{
                        label: formData.soilType || 'Select Soil Type',
                        value: formData.soilType,
                    }}
                    options={soilType}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, soilType: opt.value }))
                    }
                    mandatory={true}
                />
                <FilterDropdown
                    label="Existing Ground Conditions"
                    name="existingGroundConditions"
                    placeholder="Select Existing Ground Conditions"
                    theme="light"
                    selectedOption={{
                        label: formData.existingGroundConditions || 'Select Existing Ground Conditions',
                        value: formData.existingGroundConditions,
                    }}
                    options={existingGroundConditions}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, existingGroundConditions: opt.value }))
                    }
                    mandatory={true}
                />
                <InputField
                    label="FSI Permissible (Base + TDR if allowed)"
                    name="fsiPermissible"
                    placeholder="Enter FSI Permissible"
                    value={formData.fsiPermissible}
                    onChange={(e) => setFormData(prev => ({ ...prev, fsiPermissible: e.target.value }))}
                    mandatory={true}
                />
                <FilterDropdown
                    label="Type Of Water Supply"
                    name="typeOfWaterSupply"
                    placeholder="Select Type Of Water Supply"
                    theme="light"
                    selectedOption={{
                        label: formData.waterTypeSupply || 'Select Type Of Water Supply',
                        value: formData.waterTypeSupply,
                    }}
                    options={waterSupplyAvailable}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, waterTypeSupply: opt.value }))
                    }
                    mandatory={true}
                />
                <FilterDropdown
                    label="Surrounding Land Use"
                    name="surroundingLandUse"
                    placeholder="Select Surrounding Land Use"
                    theme="light"
                    selectedOption={{
                        label: formData.surroundingLandUse || 'Select Surrounding Land Use',
                        value: formData.surroundingLandUse,
                    }}
                    options={surroundingLandUse}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, surroundingLandUse: opt.value }))
                    }
                    mandatory={true}
                />
                <FilterDropdown
                    label="Type Of Land Tenure"
                    name="typeOfLandTenure"
                    placeholder="Select Surrounding Land Use"
                    theme="light"
                    selectedOption={{
                        label: formData.typeOfLandTenure || 'Select Type Of Land Tenure',
                        value: formData.typeOfLandTenure,
                    }}
                    options={landTenureType}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, typeOfLandTenure: opt.value }))
                    }
                    mandatory={true}
                />
                <FilterDropdown
                    label="Land Ownership Type"
                    name="landOwnerShipType"
                    placeholder="Select Land Ownership Type"
                    theme="light"
                    selectedOption={{
                        label: formData.landOwnerShipType || 'Select Land Ownership Type',
                        value: formData.landOwnerShipType,
                    }}
                    options={landOwnerShipType}
                    onChange={(opt) =>
                        setFormData((prev) => ({ ...prev, landOwnerShipType: opt.value }))
                    }
                    mandatory={true}
                />

                <InputField
                    label="Distance From Nearest Town (KM)"
                    name="distanceFromNearestTown"
                    placeholder="Enter Distance From Nearest Town"
                    value={formData.distanceFromNearestTown}
                    onChange={(e) => setFormData(prev => ({ ...prev, distanceFromNearestTown: e.target.value }))}
                    mandatory={true}
                />

                <InputField
                    label="Distance From Highway (KM)"
                    name="distanceFromHighway"
                    placeholder="Enter Distance From Highway"
                    value={formData.distanceFromHighway}
                    onChange={(e) => setFormData(prev => ({ ...prev, distanceFromHighway: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Distance From Railway Station (KM)"
                    name="distanceFromRailwayStation"
                    placeholder="Enter Distance From Railway Station"
                    value={formData.distanceFromRailwayStation}
                    onChange={(e) => setFormData(prev => ({ ...prev, distanceFromRailwayStation: e.target.value }))}
                    mandatory={true}
                />

                <InputField
                    label="Distance From Airport (KM)"
                    name="distanceFromAirport"
                    placeholder="Enter Distance From Airport"
                    value={formData.distanceFromAirport}
                    onChange={(e) => setFormData(prev => ({ ...prev, distanceFromAirport: e.target.value }))}
                    mandatory={true}
                />
                <InputField
                    label="Total Number Of Trees On Site"
                    name="totalNumberOfTreesOnSite"
                    placeholder="Enter Total Number Of Trees On Site"
                    value={formData.totalNumberOfTreesOnSite}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalNumberOfTreesOnSite: e.target.value }))}
                    mandatory={true}
                />

            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isPowerOfAttorneyInvolved || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPowerOfAttorneyInvolved: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Any Power of Attorney (POA) involved?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isFencingBoundaryWallPresent || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFencingBoundaryWallPresent: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Fencing / Boundary Wall Present?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isLandConvertedToNonAgriculture || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isLandConvertedToNonAgriculture: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Land Converted to Non-Agricultural?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isAvailabilityOfAccessRoad || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isAvailabilityOfAccessRoad: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Availability of Access Road?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isElectricityConnectionNearby || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isElectricityConnectionNearby: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Electricity Connection Nearby?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isPlotUnderLitigationOrder || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPlotUnderLitigationOrder: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Plot Under Litigation / Stay Orders?
                </label>
                <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isSevenByTwelve || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, isSevenByTwelve: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    7/12?
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
    );
};

export default RebuildLandAdd;