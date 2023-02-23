CREATE SCHEMA countries_codes_and_coordinates;

CREATE TABLE Ambient_Air_Quality (
	aq_id VARCHAR(255) PRIMARY KEY,
	Region VARCHAR(255),
	ISO3 VARCHAR(255),
	Country VARCHAR(255),
	City VARCHAR(255),
	Year INT,
	PM25 FLOAT,
	PM10 FLOAT,
	NO2 FLOAT,
	FOREIGN KEY(ISO3) REFERENCES Countries_Codes_and_Coordinates(alpha_3_code)
);

CREATE TABLE AQ_Pollution_Mortality (
	mor_id VARCHAR(255) PRIMARY KEY,
	Country  VARCHAR(255),
	ISO3 VARCHAR(255),
	Death_Rate_Ranking INT,
	Total_Pollution_Deaths INT, 
	Air_Pollution_Deaths INT,
	Water_Pollution_Deaths INT,
	Occupational_Pollution_Deaths INT,
	Lead_Deaths INT,
	FOREIGN KEY(ISO3) REFERENCES Countries_Codes_and_Coordinates(alpha_3_code)
);


CREATE TABLE Death_Rates_From_Air_Pollution (
	dap_id VARCHAR(255) PRIMARY KEY,
	Country VARCHAR(255),
	ISO3 VARCHAR(255),
	Year INT,
	Household_Air_Pollution_Deaths FLOAT,
	Ambient_Particulate_Matter_Pollution_Deaths FLOAT,
	Air_Pollution_Deaths FLOAT,
	Ambient_Ozone_Pollution_Deaths FLOAT,
	FOREIGN KEY(ISO3) REFERENCES Countries_Codes_and_Coordinates(alpha_3_code)
);

CREATE TABLE Disease_Burden_By_Risk_Factor (
	DALYs_id VARCHAR(255) PRIMARY KEY,
	Country VARCHAR(255),
	ISO3 VARCHAR(255),
	Year INT,
	DALYs_Low_Physical_Activity FLOAT,
	DALYs_Non_Exclusive_Breastfeeding FLOAT,
	DALYs_Air_Pollution FLOAT,
	DALYs_Child_Wasting FLOAT,
	DALYs_High_Systolic_BP FLOAT,
	DALYs_High_Fasting_Glucose FLOAT,
	DALYs_Child_Stunting FLOAT,
	DALYs_High_Body_Mass_Index FLOAT,
	DALYS_Secondhand_Smoke FLOAT,
	DALYs_Unsafe_Sanitation FLOAT,
	DALYs_Unsafe_Water_Source FLOAT,
	DALYs_Diet_Low_in_Vegetables FLOAT,
	DALYs_Diet_Low_in_Fruits FLOAT,
	DALYs_Diet_High_in_Sodium FLOAT,
	DALYs_Drug_Use FLOAT,
	DALYs_Household_Air_Pollution_from_Solid_Fuels FLOAT,
	DALYs_High_LDL_Cholesterol FLOAT,
	DALYs_Iron_Deficiency FLOAT,
	DALYs_Zinc_Deficiency FLOAT,
	DALYs_Smoking FLOAT,
	DALYs_VitaminA_Deficiency FLOAT,
	DALYs_Particulate_Matter_Pollution FLOAT,
	FOREIGN KEY(ISO3) REFERENCES Countries_Codes_and_Coordinates(alpha_3_code)
);

CREATE TABLE Number_of_Deaths_By_Risk_Factor (
	dbr_id VARCHAR(255) PRIMARY KEY,
	Country VARCHAR(255),
	ISO3 VARCHAR(255),
	Year INT,
	Deaths_from_Outdoor_Air_Pollution INT,
	Deaths_from_High_Systolic_Blood_Pressure INT,
	Deaths_from_High_Sodium_Diet INT,
	Deaths_from_Low_Whole_Grains_Diet INT,
	Deaths_from_Alcohol_Use INT,
	Deaths_from_Low_Fruits_Diet INT,
	Deaths_from_Unsafe_Water_Source INT,
	Deaths_from_Secondhand_Smoke INT,
	Death_from_Low_Birth_Weight INT,
	Deaths_from_Child_Wasting INT,
	Deaths_from_Unsafe_Sex INT,
	Deaths_from_Diet_low_in_nuts_and_seeds INT,
	Death_from_Household_Air_Pollution_from_Solid_Fuels INT,
	Deaths_from_Diet_Low_in_Vegetables INT,
	Deaths_Low_Physical_Activity INT,
	Deaths_from__Smoking INT,
	Deaths_from_High_Fasting_Plasma_Glucose INT,
	Deaths_from_Air_Pollution INT,
	Deaths_from_High_Body_Mass_Index INT,
	Deaths_from_Unsafe_Sanitation INT,
	Deaths_from_No_Access_to_Handwashing_Facility INT,
	Deaths_from_Drug_Use INT,
	Deaths_from_Low_Bone_Mineral_Density INT,
	Deaths_from_VitaminA_Deficiency INT,
	Deaths_from_Child_Stunting INT,
	Deaths_from_Discontinued_Breastfeeding INT,
	Deaths_from_Non_Exclusive_Breastfeeding INT,
	Deaths_from_Iron_Deficiency INT,
	FOREIGN KEY(ISO3) REFERENCES Countries_Codes_and_Coordinates(alpha_3_code)
);

CREATE TABLE Outdoor_Pollution_Rates_By_Age (
	OAD_id VARCHAR(255) PRIMARY KEY,
	Country VARCHAR(255),
	ISO3 VARCHAR(255),
	Year INT,
	Under_5 FLOAT,
	Five_to_14_years FLOAT,
	Seventy_plus_years FLOAT,
	Fifteen_to_49_years FLOAT,
	Fifty_to_69_years FLOAT,
	FOREIGN KEY(ISO3) REFERENCES Countries_Codes_and_Coordinates(alpha_3_code)
);

CREATE TABLE Countries_Codes_and_Coordinates (
	coor_id VARCHAR(255) PRIMARY KEY,
	Country VARCHAR(255),
	alpha_2_code VARCHAR(255),
	alpha_3_code VARCHAR(255) Unique,
	numeric_code INT,
	latitude FLOAT,
	longitude FLOAT
);







SELECT Ambient_Air_Quality.PM25, countries_codes_and_coordinates.country
FROM Ambient_Air_Quality 
JOIN countries_codes_and_coordinates
ON Ambient_Air_Quality.iso3 = countries_codes_and_coordinates.alpha_3_code;

SELECT * 
FROM Ambient_Air_Quality

SELECT* 
FROM countries_codes_and_coordinates

SELECT* 
FROM AQ_Pollution_Mortality

SELECT* 
FROM Death_Rates_From_Air_Pollution

SELECT* 
FROM Disease_Burden_By_Risk_Factor

SELECT* 
FROM Number_of_Deaths_By_Risk_Factor

SELECT* 
FROM Outdoor_Pollution_Rates_By_Age

-- Drop Table Countries_Codes_and_Coordinates;
-- Drop Table Ambient_Air_Quality;
-- Drop Table AQ_Pollution_Mortality;
-- Drop Table Death_Rates_From_Air_Pollution;
-- Drop Table Disease_Burden_By_Risk_Factor;
-- Drop Table Number_of_Deaths_By_Risk_Factor;
-- Drop Table Outdoor_Pollution_Rates_By_Age;

-- 	FOREIGN KEY(alpha_3_code) REFERENCES Ambient_Air_Quality(ISO3),
-- 	FOREIGN KEY(alpha_3_code) REFERENCES AQ_Pollution_Mortality(ISO3),
-- 	FOREIGN KEY(alpha_3_code) REFERENCES Death_Rates_From_Air_Pollution(ISO3),
-- 	FOREIGN KEY(alpha_3_code) REFERENCES Disease_Burden_By_Risk_Factor(ISO3),
-- 	FOREIGN KEY(alpha_3_code) REFERENCES Number_of_Deaths_By_Risk_Factor(ISO3),
-- 	FOREIGN KEY(alpha_3_code) REFERENCES Outdoor_Pollution_Rates_By_Age(ISO3)