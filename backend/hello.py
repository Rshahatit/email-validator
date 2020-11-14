# implements a WSGI application and acts as a central registry for the view functions, the url rules, template configs and much more.
from flask import Flask, request
import re
# the name of the apps module or package. used to find resources on the filesystem.
# import pdb
# pdb.set_trace()
app = Flask(__name__)


@app.route('/')
def hello_world():
    return "Hello World!"


@app.route('/validate', methods=['POST'])
def validate():
    regex = r"[\w]+@[\w]+\.[\w]+"
    email = request.form["email"]
    if not re.fullmatch(regex, email):
        return "Email invalid"
    else:
        return "valid"
