-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Jtkodh
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Ambient_Air_Quality" (
    "aq_id" VARCHAR(255)   NOT NULL,
    "Region" VARCHAR(255)   NOT NULL,
    "ISO3" VARCHAR(255)   NOT NULL,
    "Country" VARCHAR(255)   NOT NULL,
    "City" VARCHAR(255)   NOT NULL,
    "Year" INT   NOT NULL,
    "PM25" FLOAT   NOT NULL,
    "PM10" FLOAT   NOT NULL,
    "NO2" FLOAT   NOT NULL,
    CONSTRAINT "pk_Ambient_Air_Quality" PRIMARY KEY (
        "aq_id"
     )
);

CREATE TABLE "AQ_Pollution_Mortality" (
    "mor_id" VARCHAR(255)   NOT NULL,
    "Country" VARCHAR(255)   NOT NULL,
    "ISO3" VARCHAR(255)   NOT NULL,
    "Death_Rate_Ranking" INT   NOT NULL,
    "Total_Pollution_Deaths" INT   NOT NULL,
    "Air_Pollution_Deaths" INT   NOT NULL,
    "Water_Pollution_Deaths" INT   NOT NULL,
    "Occupational_Pollution_Deaths" INT   NOT NULL,
    "Lead_Deaths" INT   NOT NULL,
    CONSTRAINT "pk_AQ_Pollution_Mortality" PRIMARY KEY (
        "mor_id"
     )
);

CREATE TABLE "Countries_Codes_and_Coordinates" (
    "coor_id" VARCHAR(255)   NOT NULL,
    "Country" VARCHAR(255)   NOT NULL,
    "alpha_2_code" VARCHAR(255)   NOT NULL,
    "alpha_3_code" VARCHAR(255)   NOT NULL,
    "numeric_code" INT   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    CONSTRAINT "pk_Countries_Codes_and_Coordinates" PRIMARY KEY (
        "coor_id"
     )
);

CREATE TABLE "Death_Rates_From_Air_Pollution" (
    "dap_id" VARCHAR(255)   NOT NULL,
    "Country" VARCHAR(255)   NOT NULL,
    "ISO3" VARCHAR(255)   NOT NULL,
    "Year" INT   NOT NULL,
    "Household_Air_Pollution_Deaths" FLOAT   NOT NULL,
    "Ambient_Particulate_Matter_Pollution_Deaths" FLOAT   NOT NULL,
    "Air_Pollution_Deaths" FLOAT   NOT NULL,
    "Ambient_Ozone_Pollution_Deaths" FLOAT   NOT NULL,
    CONSTRAINT "pk_Death_Rates_From_Air_Pollution" PRIMARY KEY (
        "dap_id"
     )
);

CREATE TABLE "Disease_Burden_By_Risk_Factor" (
    "DALYs_id" VARCHAR(255)   NOT NULL,
    "Country" VARCHAR(255)   NOT NULL,
    "ISO3" VARCHAR(255)   NOT NULL,
    "Year" INT   NOT NULL,
    "DALYs_Low_Physical_Activity" FLOAT   NOT NULL,
    "DALYs_Non_Exclusive_Breastfeeding" FLOAT   NOT NULL,
    "DALYs_Air_Pollution" FLOAT   NOT NULL,
    "DALYs_Child_Wasting" FLOAT   NOT NULL,
    "DALYs_High_Systolic_BP" FLOAT   NOT NULL,
    "DALYs_High_Fasting_Glucose" FLOAT   NOT NULL,
    "DALYs_Child_Stunting" FLOAT   NOT NULL,
    "DALYs_High_Body_Mass_Index" FLOAT   NOT NULL,
    "DALYS_Secondhand_Smoke" FLOAT   NOT NULL,
    "DALYs_Unsafe_Sanitation" FLOAT   NOT NULL,
    "DALYs_Unsafe_Water_Source" FLOAT   NOT NULL,
    "DALYs_Diet_Low_in_Vegetables" FLOAT   NOT NULL,
    "DALYs_Diet_Low_in_Fruits" FLOAT   NOT NULL,
    "DALYs_Diet_High_in_Sodium" FLOAT   NOT NULL,
    "DALYs_Drug_Use" FLOAT   NOT NULL,
    "DALYs_Household_Air_Pollution_from_Solid_Fuels" FLOAT   NOT NULL,
    "DALYs_High_LDL_Cholesterol" FLOAT   NOT NULL,
    "DALYs_Iron_Deficiency" FLOAT   NOT NULL,
    "DALYs_Zinc_Deficiency" FLOAT   NOT NULL,
    "DALYs_Smoking" FLOAT   NOT NULL,
    "DALYs_VitaminA_Deficiency" FLOAT   NOT NULL,
    "DALYs_Particulate_Matter_Pollution" FLOAT   NOT NULL,
    CONSTRAINT "pk_Disease_Burden_By_Risk_Factor" PRIMARY KEY (
        "DALYs_id"
     )
);

CREATE TABLE "Number_of_Deaths_By_Risk_Factor" (
    "dbr_id" VARCHAR(255)   NOT NULL,
    "Country" VARCHAR(255)   NOT NULL,
    "ISO3" VARCHAR(255)   NOT NULL,
    "Year" INT   NOT NULL,
    "Deaths_from_Outdoor_Air_Pollution" INT   NOT NULL,
    "Deaths_from_High_Systolic_Blood_Pressure" INT   NOT NULL,
    "Deaths_from_High_Sodium_Diet" INT   NOT NULL,
    "Deaths_from_Low_Whole_Grains_Diet" INT   NOT NULL,
    "Deaths_from_Alcohol_Use" INT   NOT NULL,
    "Deaths_from_Low_Fruits_Diet" INT   NOT NULL,
    "Deaths_from_Unsafe_Water_Source" INT   NOT NULL,
    "Deaths_from_Secondhand_Smoke" INT   NOT NULL,
    "Death_from_Low_Birth_Weight" INT   NOT NULL,
    "Deaths_from_Child_Wasting" INT   NOT NULL,
    "Deaths_from_Unsafe_Sex" INT   NOT NULL,
    "Deaths_from_Diet_low_in_nuts_and_seeds" INT   NOT NULL,
    "Death_from_Household_Air_Pollution_from_Solid_Fuels" INT   NOT NULL,
    "Deaths_from_Diet_Low_in_Vegetables" INT   NOT NULL,
    "Deaths_Low_Physical_Activity" INT   NOT NULL,
    "Deaths_from__Smoking" INT   NOT NULL,
    "Deaths_from_High_Fasting_Plasma_Glucose" INT   NOT NULL,
    "Deaths_from_Air_Pollution" INT   NOT NULL,
    "Deaths_from_High_Body_Mass_Index" INT   NOT NULL,
    "Deaths_from_Unsafe_Sanitation" INT   NOT NULL,
    "Deaths_from_No_Access_to_Handwashing_Facility" INT   NOT NULL,
    "Deaths_from_Drug_Use" INT   NOT NULL,
    "Deaths_from_Low_Bone_Mineral_Density" INT   NOT NULL,
    "Deaths_from_VitaminA_Deficiency" INT   NOT NULL,
    "Deaths_from_Child_Stunting" INT   NOT NULL,
    "Deaths_from_Discontinued_Breastfeeding" INT   NOT NULL,
    "Deaths_from_Non_Exclusive_Breastfeeding" INT   NOT NULL,
    "Deaths_from_Iron_Deficiency" INT   NOT NULL,
    CONSTRAINT "pk_Number_of_Deaths_By_Risk_Factor" PRIMARY KEY (
        "dbr_id"
     )
);

CREATE TABLE "Outdoor_Pollution_Rates_By_Age" (
    "OAD_id" VARCHAR(255)   NOT NULL,
    "Country" VARCHAR(255)   NOT NULL,
    "ISO3" VARCHAR(255)   NOT NULL,
    "Year" INT   NOT NULL,
    "Under_5" FLOAT   NOT NULL,
    "Five_to_14_years" FLOAT   NOT NULL,
    "Seventy_plus_years" FLOAT   NOT NULL,
    "Fifteen_to_49_years" FLOAT   NOT NULL,
    "Fifty_to_69_years" FLOAT   NOT NULL,
    CONSTRAINT "pk_Outdoor_Pollution_Rates_By_Age" PRIMARY KEY (
        "OAD_id"
     )
);

ALTER TABLE "Ambient_Air_Quality" ADD CONSTRAINT "fk_Ambient_Air_Quality_ISO3" FOREIGN KEY("ISO3")
REFERENCES "Countries_Codes_and_Coordinates" ("alpha_3_code");

ALTER TABLE "AQ_Pollution_Mortality" ADD CONSTRAINT "fk_AQ_Pollution_Mortality_ISO3" FOREIGN KEY("ISO3")
REFERENCES "Countries_Codes_and_Coordinates" ("alpha_3_code");

ALTER TABLE "Death_Rates_From_Air_Pollution" ADD CONSTRAINT "fk_Death_Rates_From_Air_Pollution_ISO3" FOREIGN KEY("ISO3")
REFERENCES "Countries_Codes_and_Coordinates" ("alpha_3_code");

ALTER TABLE "Disease_Burden_By_Risk_Factor" ADD CONSTRAINT "fk_Disease_Burden_By_Risk_Factor_ISO3" FOREIGN KEY("ISO3")
REFERENCES "Countries_Codes_and_Coordinates" ("alpha_3_code");

ALTER TABLE "Number_of_Deaths_By_Risk_Factor" ADD CONSTRAINT "fk_Number_of_Deaths_By_Risk_Factor_ISO3" FOREIGN KEY("ISO3")
REFERENCES "Countries_Codes_and_Coordinates" ("alpha_3_code");

ALTER TABLE "Outdoor_Pollution_Rates_By_Age" ADD CONSTRAINT "fk_Outdoor_Pollution_Rates_By_Age_ISO3" FOREIGN KEY("ISO3")
REFERENCES "Countries_Codes_and_Coordinates" ("alpha_3_code");

