from flask import Blueprint, session, redirect, url_for
from controllers.Homecontrollers import login, dashboard, transaksi, transaksiall
from controllers.Prosescontrollers import loginproses, export_excel

app = Blueprint('main', __name__)
app.secret_key = 'adexganteng'


@app.route('/')
@app.route('/login')
def loginpage():
    if 'loggedin' in session:
        return redirect(url_for('main.dashboardpage'))
    return login()


@app.route('/exportexcel', methods=['POST'])
def exportexcel():
    if 'loggedin' in session:
        return export_excel()
    return redirect(url_for('main.loginpage'))


@app.route('/dashboard')
def dashboardpage():
    if 'loggedin' in session:
        session.pop('datanik', None)
        return dashboard()
    return redirect(url_for('main.loginpage'))


@app.route('/transaksi/<name>/<tgl1>/<tgl2>', methods=['GET'])
@app.route('/transaksi/<name>/<tgl1>/<tgl2>/<nik>', methods=['GET'])
def transaksipage(name=None, tgl1=None, tgl2=None, nik=None):
    if 'loggedin' in session:
        return transaksi(name, tgl1, tgl2, nik)
    return redirect(url_for('main.loginpage'))


@app.route('/transaksiall/<tgl1>/<tgl2>', methods=['GET'])
@app.route('/transaksiall/<tgl1>/<tgl2>/<nik>', methods=['GET'])
def transasksiallpage(tgl1=None, tgl2=None, nik=None):
    if 'loggedin' in session:
        return transaksiall(tgl1, tgl2, nik)
    return redirect(url_for('main.loginpage'))

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('loggedin', None)
    session.pop('username', None)
    return redirect(url_for('main.loginpage'))


@app.route('/loginproses', methods=['POST'])
def loginprosespage():  # put application's code here
    return loginproses()
