# ----------------------- Reflect Tables into SQLAlchemy ORM -----------------------
# ----------------- Python SQL toolkit and Object Relational Mapper ----------------

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
from pprint import pprint

def initiate_orm (db_path):
    pprint(f"""Analyzing: {db_path} ...""")
    # create engine to path
    engine = create_engine(db_path)
    inspector_db = inspect(engine)
    # reflect an existing database into a new model
    base_db = automap_base()
    # reflect the tables
    base_db.prepare(engine, reflect=True)
    # view all of the classes that automap found
    base_keys=base_db.classes.keys()
    # save references to each table
    references = []
    for indx, onekeys in enumerate(base_keys):
        exec(f"""{onekeys}_var=base_db.classes.{onekeys}""")
        exec(f"""references.append({onekeys}_var)""")
    # create our session (link) from Python to the DB
    session_db = Session(bind=engine)
    # print and return results
    result={"engine":engine,
            "inspector":inspector_db,
            "base":base_db,
            "key":base_keys,
            "reference":references,
            "session":session_db}
    pprint(f"""Database Information:""")
    pprint(result)
    return result
#------------------------------------------------------------------------------------