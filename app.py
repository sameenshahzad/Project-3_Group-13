##########################################################################################################
# ------------------------------------------- Air Quality APP --------------------------------------------
##########################################################################################################

from sqlalchemy import create_engine
from sqlalchemy import desc
# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from threading import Timer
import webbrowser
# -------------------------------------------------------------------------------------------------------
# Connect to local database
engine = create_engine('postgresql://postgres:1372@localhost:5432/air_qualities')
connection = engine.connect()
# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)
# View all of the classes that automap found
Base.classes.keys()
# Save references to each table
Countries_codes_and_coordinates = Base.classes.countries_codes_and_coordinates
Ambient_air_quality_data = Base.classes.ambient_air_quality_data
Death_rates_from_air_pollution = Base.classes.death_rates_from_air_pollution
Disease_burden_by_risk_factor = Base.classes.disease_burden_by_risk_factor
Number_of_deaths_by_risk_factor = Base.classes.number_of_deaths_by_risk_factor
Outdoor_air_death_rates_by_age = Base.classes.outdoor_air_death_rates_by_age
Aq_pollution_mortality_data = Base.classes.aq_pollution_mortality_data
# Create our session (link) from Python to the DB
session = Session(engine)

# 1. flask Setup-----------------------------------------------------------------------------------------/
# a-1) import Flask
from flask import Flask, jsonify, render_template

# b-1) create an app, being sure to pass __name__ and insert .html folder
app = Flask(__name__,template_folder="./")

# c-1) initiate orm with database path

##########################################################################################################
############################################### HomePage #################################################
# define a homepage route (user hits the / route)
@app.route("/")
def homepage():
    print("Server received request for 'Home' page...")
    return render_template ("aq_index.html")

##########################################################################################################
########################################### Map Country Data #############################################
# define a countrydata route
@app.route("/countrydata")
def country_data():
    print("Server received request for 'Country Data'...")
    # create our session (link) from Python to the DB
    session
    # create the SQLAlchemy query
    country_information=session.query(Countries_codes_and_coordinates.country,
                                  (Countries_codes_and_coordinates.latitude).label("lat"),
                                  (Countries_codes_and_coordinates.longitude).label("lng")
                                 ).distinct().all()
    session.close()
    # convert the query results to a dictionary
    country = {
    'name': [row.country for row in country_information],
    'metadata': [{'country': row.country, 'lat': row.lat, 'lng': row.lng} for row in country_information]
    }
    # return the JSON representation of dictionary.
    return jsonify(country)

##########################################################################################################
####################################### Ambient Air Quality Data #########################################
# define a particle route
@app.route("/mapdatadic")
def world_map_dic():
    print("Server received request for 'World Map Data")
    # create our session (link) from Python to the DB
    session
    # Create the SQLAlchemy query
    result = (session.query(Ambient_air_quality_data.country, Ambient_air_quality_data.year,
            func.sum(Ambient_air_quality_data.pm25).label('pm25_sum'),
            func.sum(Ambient_air_quality_data.pm10).label('pm10_sum'),
            func.sum(Ambient_air_quality_data.no2).label('no2_sum'))
          .filter(Ambient_air_quality_data.year >= 2015)
          .group_by(Ambient_air_quality_data.country, Ambient_air_quality_data.year))
    session.close()
    # convert the query results to a dictionary
    result_dict_list = []
    for row in result:
        result_dict = next((d for d in result_dict_list if d["country"] == row.country), None)
        if result_dict is None:
            result_dict = {"country": row.country, "features": []}
            result_dict_list.append(result_dict)
        feature_dict = {"year": row.year, "properties": {'pm2_5': row.pm25_sum, 'pm10': row.pm10_sum, 'no2': row.no2_sum}}
        result_dict["features"].append(feature_dict)
    # return the JSON representation of dictionary.
    return jsonify(result_dict_list)

##########################################################################################################
################################## Outdoor Pollution Rates by Ages #######################################
# define a agepollution route
@app.route("/agepollution")
def age_pollution():
    print("Server received request for Outdoor Pollution Rates by Ages")
    # create our session (link) from Python to the DB
    session
    # create the SQLAlchemy query
    age_pollution_results = session.query(
    Outdoor_air_death_rates_by_age.country,
    Outdoor_air_death_rates_by_age.year,
    func.sum(Outdoor_air_death_rates_by_age.under_5).label('under_5'),
    func.sum(Outdoor_air_death_rates_by_age.age_5_to_14_years).label('age_5_to_14_years'),
    func.sum(Outdoor_air_death_rates_by_age.age_70plus_years).label('age_70plus_years'),
    func.sum(Outdoor_air_death_rates_by_age.age_15_to_49_years).label('age_15_to_49_years'),
    func.sum(Outdoor_air_death_rates_by_age.age_50_to_69_years).label('age_50_to_69_years')
    ).filter(
        Outdoor_air_death_rates_by_age.year >= 2015
    ).group_by(
        Outdoor_air_death_rates_by_age.country,
        Outdoor_air_death_rates_by_age.year
    ).order_by(
        func.sum(Outdoor_air_death_rates_by_age.under_5).desc(),
        func.sum(Outdoor_air_death_rates_by_age.age_5_to_14_years).desc(),
        func.sum(Outdoor_air_death_rates_by_age.age_70plus_years).desc(),
        func.sum(Outdoor_air_death_rates_by_age.age_15_to_49_years).desc(),
        func.sum(Outdoor_air_death_rates_by_age.age_50_to_69_years).desc()
    ).all()
    session.close()
    # convert the query results to a dictionary
    age_pollution_results_dict = {}
    for row in age_pollution_results:
        age_pollution_results_dict.setdefault(row.country, {})[row.year] = {
            'under5': row.under_5,
            'age5to14': row.age_5_to_14_years,
            'age15to49': row.age_15_to_49_years,
            'age50to69': row.age_50_to_69_years,
            'age70plus': row.age_70plus_years
        }
    # return the JSON representation of dictionary.
    return jsonify(age_pollution_results_dict)

##########################################################################################################
################################## Death Rates From Air Pollution ########################################
# define a fourairpollution route
@app.route("/fourairpollution")
def fourair_pollution():
    print("Server received request for Death Rates From Air Pollution")
    # create our session (link) from Python to the DB
    session
    # Create the SQLAlchemy query
    four_air_pollution = session.query(
        Death_rates_from_air_pollution.country,
        Death_rates_from_air_pollution.year,
        (Death_rates_from_air_pollution.household_air_pollution_deaths).label('HAP'),
        (Death_rates_from_air_pollution.ambient_particulate_matter_pollution_deaths).label('APM'),
        (Death_rates_from_air_pollution.air_pollution_deaths).label('AP'),
        (Death_rates_from_air_pollution.ambient_ozone_pollution_deaths).label('AOP'))\
        .filter(Death_rates_from_air_pollution.year >= 2015)
    session.close()
    # convert the query results to a dictionary
    four_air_pollution_dict = {}
    for row in four_air_pollution:
        four_air_pollution_dict.setdefault(row.country, {})[row.year] = {
            'HAP': row.HAP,
            'APM': row.APM,
            'AP': row.AP,
            'AOP': row.AOP
        }
    # return the JSON representation of dictionary.
    return jsonify(four_air_pollution_dict)

##########################################################################################################
##################################### Aq pollution mortality data ########################################
# define a pollutiondeaths route
@app.route("/pollutiondeaths")
def pollutionresult():
    print("Server received request for Aq pollution mortality data")
    # create our session (link) from Python to the DB
    session
    # Create the SQLAlchemy query
    pollution_deaths = session.query(
                            Aq_pollution_mortality_data.country,
                            (Aq_pollution_mortality_data.total_pollution_deaths).label("TP"),
                            func.rank().over(order_by=Aq_pollution_mortality_data.total_pollution_deaths.desc()).label('TP_Rank'),
                            (Aq_pollution_mortality_data.air_pollution_deaths).label("AP"),
                            func.rank().over(order_by=Aq_pollution_mortality_data.air_pollution_deaths.desc()).label('AP_Rank'),
                            (Aq_pollution_mortality_data.water_pollution_deaths).label("WP"),
                            func.rank().over(order_by=Aq_pollution_mortality_data.water_pollution_deaths.desc()).label('WP_Rank'),
                            (Aq_pollution_mortality_data.occupational_pollution_deaths).label("OP"),
                            func.rank().over(order_by=Aq_pollution_mortality_data.occupational_pollution_deaths.desc()).label('OP_Rank'),
                            (Aq_pollution_mortality_data.lead_deaths).label("LP"),
                            func.rank().over(order_by=Aq_pollution_mortality_data.lead_deaths.desc()).label('LP_Rank'))
    session.close()
    # convert the query results to a dictionary
    pollution_deaths_dict = {}
    for row in pollution_deaths:
        country = row.country
        pollution_deaths_dict.setdefault(country, {}).update({
            'TP': row.TP,
            'TP_Rank': row.TP_Rank,
            'AP': row.AP,
            'AP_Rank': row.AP_Rank,
            'WP': row.WP,
            'WP_Rank': row.WP_Rank,
            'OP': row.OP,
            'OP_Rank': row.OP_Rank,
            'LP': row.LP,
            'LP_Rank': row.LP_Rank
        })
    # return the JSON representation of dictionary.
    return jsonify(pollution_deaths_dict)


##########################################################################################################
##################################### Disease Burden by Risk Factor ######################################
# define a dbbrf route
@app.route("/dbbrf")
def dbbrf_func():
    print("Server received request for Aq pollution mortality data")
    # create our session (link) from Python to the DB
    session
    # Create the SQLAlchemy query
    dbbrf_query = session.query(Disease_burden_by_risk_factor.country,
                                Disease_burden_by_risk_factor.year,
                                (Disease_burden_by_risk_factor.dalys_low_physical_activity).label("LPA"),
                                (Disease_burden_by_risk_factor.dalys_non_exclusive_breastfeeding).label("NEB"),
                                (Disease_burden_by_risk_factor.dalys_air_pollution).label("AP"),
                                (Disease_burden_by_risk_factor.dalys_child_wasting).label("CW"),
                                (Disease_burden_by_risk_factor.dalys_high_systolic_bp).label("HS"),
                                (Disease_burden_by_risk_factor.dalys_high_fasting_glucose).label("HFG"),
                                (Disease_burden_by_risk_factor.dalys_child_stunting).label("CS"),
                                (Disease_burden_by_risk_factor.dalys_high_body_mass_index).label("HBMI"),
                                (Disease_burden_by_risk_factor.dalys_secondhand_smoke).label("SS"),
                                (Disease_burden_by_risk_factor.dalys_unsafe_sanitation).label("US"),
                                (Disease_burden_by_risk_factor.dalys_unsafe_water_source).label("UWS"),
                                (Disease_burden_by_risk_factor.dalys_diet_low_in_vegetables).label("DLV"),
                                (Disease_burden_by_risk_factor.dalys_diet_low_in_fruits).label("DLF"),
                                (Disease_burden_by_risk_factor.dalys_diet_high_in_sodium).label("HIS"),
                                (Disease_burden_by_risk_factor.dalys_drug_use).label("DU"),
                                (Disease_burden_by_risk_factor.dalys_household_air_pollution_from_solid_fuels).label("HASF"),
                                (Disease_burden_by_risk_factor.dalys_high_ldl_cholesterol).label("HLC"),
                                (Disease_burden_by_risk_factor.dalys_iron_deficiency).label("ID"),
                                (Disease_burden_by_risk_factor.dalys_zinc_deficiency).label("ZD"),
                                (Disease_burden_by_risk_factor.dalys_smoking).label("S"),
                                (Disease_burden_by_risk_factor.dalys_vitamina_deficiency).label("DVD"),
                                (Disease_burden_by_risk_factor.dalys_particulate_matter_pollution).label("PMP"))\
                            .filter(Disease_burden_by_risk_factor.year>=2015)\
                            .all()
    session.close()
    # convert the query results to a dictionary
    dbbrf_dic = {}
    for row in dbbrf_query:
        country, year, LPA, NEB, AP, CW, HS, HFG, CS, HBMI, SS, US, UWS, DLV, DLF,\
        HIS, DU, HASF, HLC, ID, ZD, S, DVD, PMP = row

        if country not in dbbrf_dic:
            dbbrf_dic[country] = {}

        dbbrf_dic[country][year] = {'LPA': LPA,'NEB': NEB,'AP': AP,'CW': CW,'HS': HS,\
            'HFG': HFG,'CS': CS,'HBMI': HBMI,'SS': SS,'US': US,'UWS': UWS,'DLV': DLV,'DLF': DLF,\
            'HIS': HIS,'DU': DU,'HASF': HASF,'HLC': HLC,'ID': ID,'ZD': ZD,'S': S,'DVD': DVD,'PMP': PMP
        }

    # return the JSON representation of dictionary.
    return jsonify(dbbrf_dic)
##########################################################################################################
##################################### Disease Burden by Risk Factor ######################################
# define a ndrf route
@app.route("/ndrf")
def ndrf_func():
    print("Server received request for Aq pollution mortality data")
    # create our session (link) from Python to the DB
    session
    # Create the SQLAlchemy query
    ndrf_query = session.query(Number_of_deaths_by_risk_factor.country,
                            Number_of_deaths_by_risk_factor.year,
                            (Number_of_deaths_by_risk_factor.deaths_low_physical_activity).label("LPA"),
                            (Number_of_deaths_by_risk_factor.deaths_from_non_exclusive_breastfeeding).label("NEB"),
                            (Number_of_deaths_by_risk_factor.deaths_from_air_pollution).label("AP"),
                            (Number_of_deaths_by_risk_factor.deaths_from_child_wasting).label("CW"),
                            (Number_of_deaths_by_risk_factor.deaths_from_high_systolic_blood_pressure).label("HS"),
                            (Number_of_deaths_by_risk_factor.deaths_from_high_fasting_plasma_glucose).label("HFG"),
                            (Number_of_deaths_by_risk_factor.deaths_from_child_stunting).label("CS"),
                            (Number_of_deaths_by_risk_factor.deaths_from_high_body_mass_index).label("HBMI"),
                            (Number_of_deaths_by_risk_factor.deaths_from_secondhand_smoke).label("SS"),
                            (Number_of_deaths_by_risk_factor.deaths_from_unsafe_sanitation).label("US"),
                            (Number_of_deaths_by_risk_factor.deaths_from_unsafe_water_source).label("UWS"),
                            (Number_of_deaths_by_risk_factor.deaths_from_diet_low_in_vegetables).label("DLV"),
                            (Number_of_deaths_by_risk_factor.deaths_from_low_fruits_diet).label("DLF"),
                            (Number_of_deaths_by_risk_factor.deaths_from_high_sodium_diet).label("HIS"),
                            (Number_of_deaths_by_risk_factor.deaths_from_drug_use).label("DU"),
                            (Number_of_deaths_by_risk_factor.death_from_household_air_pollution_from_solid_fuels).label("HASF"),
                            (Number_of_deaths_by_risk_factor.deaths_from_discontinued_breastfeeding).label("DB"),
                            (Number_of_deaths_by_risk_factor.deaths_from_iron_deficiency).label("ID"),
                            (Number_of_deaths_by_risk_factor.deaths_from_low_bone_mineral_density).label("LBMD"),
                            (Number_of_deaths_by_risk_factor.deaths_from__smoking).label("S"),
                            (Number_of_deaths_by_risk_factor.deaths_from_vitamina_deficiency).label("DVD"),
                            (Number_of_deaths_by_risk_factor.deaths_from_outdoor_air_pollution).label("PMP"),
                            (Number_of_deaths_by_risk_factor.deaths_from_low_whole_grains_diet).label("LWGD"),
                            (Number_of_deaths_by_risk_factor.deaths_from_alcohol_use).label("AU"),
                            (Number_of_deaths_by_risk_factor.death_from_low_birth_weight).label("LBW"),
                            (Number_of_deaths_by_risk_factor.deaths_from_unsafe_sex).label("UNS"),
                            (Number_of_deaths_by_risk_factor.deaths_from_diet_low_in_nuts_and_seeds).label("LNS"),
                            (Number_of_deaths_by_risk_factor.deaths_from_no_access_to_handwashing_facility).label("NAHF"), 
                          )\
                        .filter(Number_of_deaths_by_risk_factor.year>=2015)\
                        .all()
    session.close()
    # convert the query results to a dictionary
    ndrf_dic = {}

    for row in ndrf_query:
        country, year, LPA, NEB, AP, CW, HS, HFG, CS, HBMI, SS, US, UWS, DLV, DLF,\
        HIS, DU, HASF, DB, ID, LBMD, S, DVD, PMP, LWGD, AU, LBW, UNS, LNS, NAHF = row

        if country not in ndrf_dic:
            ndrf_dic[country] = {}

        ndrf_dic[country][year] = {'LPA': LPA,'NEB': NEB,'AP': AP,'CW': CW,'HS': HS,\
            'HFG': HFG,'CS': CS,'HBMI': HBMI,'SS': SS,'US': US,'UWS': UWS,'DLV': DLV,'DLF': DLF,\
            'HIS': HIS,'DU': DU,'HASF': HASF,'DB': DB,'ID': ID,'LBMD': LBMD,'S': S,'DVD': DVD,'PMP': PMP, 'LWGD':LWGD, 'AU':AU,\
                                    'LBW':LBW,'UNS':UNS, 'LNS':LNS, 'NAHF':NAHF
                                    
        }

    # return the JSON representation of dictionary.
    return jsonify(ndrf_dic)
##########################################################################################################
####################################### Open Browser and Run App #########################################
def open_browser():
      webbrowser.open_new("http://127.0.0.1:5000")

if __name__ == "__main__":
    Timer(1,open_browser).start()
    app.run(debug=True)

##########################################################################################################


