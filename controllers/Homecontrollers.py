import datetime
from flask import render_template, session
from database.config import get_database_connection


def login():
    return render_template('login.html', title="Login")


def dashboard():
    connection = get_database_connection()
    if connection:
        try:
            tglnow = datetime.date.today()
            startdate = tglnow.replace(day=1).strftime('%Y-%m-%d')
            enddate = tglnow.strftime('%Y-%m-%d')
            cursor = connection.cursor()
            cursor.execute("SELECT sn,alias,ip_address,fw_ver,terminal_name FROM iclock_terminal")
            results = cursor.fetchall()
            cursor.close()

            connection.close()
            return render_template('content.html', title="Dashboard Page", tgl1=startdate, tgl2=enddate, data=results,
                                   dataerrors="")
        except Exception as e:
            return render_template('content.html', title="Dashboard Page", dataerrors=e)


    else:
        return render_template('content.html', title="Dashboard Page", dataerrors="Gagal terhubung ke database")


def transaksi(name, tgl1, tgl2, nik):
    serialnumber = name
    if serialnumber is None:
        return render_template('content.html', title="Dashboard Page", dataerrors="Gagal terhubung")
    else:
        tglnow = datetime.date.today()
        if tgl1 in [None, 'None'] or tgl2 in [None, 'None']:
            startdate = tglnow.replace(day=1).strftime('%Y-%m-%d') + " 00:00:00"
            enddate = tglnow.strftime('%Y-%m-%d') + " 23:59:00"
        else:
            startdate = tgl1 + " 00:00:00"
            enddate = tgl2 + " 23:59:00"

        # Tentukan SQL dan parameter berdasarkan apakah `nik` ada atau tidak
        if nik not in [None, 'None']:
            sql = """
                SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name
                FROM iclock_transaction AS ic
                LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id
                WHERE ic.terminal_sn = %s AND ic.emp_code = %s AND ic.punch_time BETWEEN %s AND %s
                ORDER BY ic.punch_time DESC, ic.emp_code ASC
                """
            where = (serialnumber, nik, startdate, enddate)
        else:
            sql = """
                SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name
                FROM iclock_transaction AS ic
                LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id
                WHERE ic.terminal_sn = %s AND ic.punch_time BETWEEN %s AND %s
                ORDER BY ic.punch_time DESC, ic.emp_code ASC
                """
            where = (serialnumber, startdate, enddate)
        connection = get_database_connection()
        if connection:
            try:

                cursor = connection.cursor(dictionary=True)
                cursor.execute(sql, where)
                results = cursor.fetchall()
                datanik = []
                seen = set()
                for row in results:
                    if row['emp_code'] not in seen:
                        datanik.append(row)
                        seen.add(row['emp_code'])
                if nik not in [None, 'None']:
                    s = []
                else:
                    session['datanik'] = datanik

                cursor.close()
                connection.close()
                return render_template('transaksi.html', title="Transaksi Page", data=results, tgl1=tgl1,
                                       tgl2=tgl2, nik=nik, datanik=session['datanik'],
                                       serialnumber=serialnumber, dataerrors="")
            except Exception as e:
                return render_template('transaksi.html', title="Transaksi Page", dataerrors=e)

        else:
            return render_template('transaksi.html', title="Transaksi Page", dataerrors="Gagal terhubung ke database")


def transaksiall(tgl1, tgl2, nik):
    tglnow = datetime.date.today()
    if tgl1 in [None, 'None'] or tgl2 in [None, 'None']:
        startdate = tglnow.replace(day=1).strftime('%Y-%m-%d') + " 00:00:00"
        enddate = tglnow.strftime('%Y-%m-%d') + " 23:59:00"
    else:
        startdate = tgl1 + " 00:00:00"
        enddate = tgl2 + " 23:59:00"

    # Tentukan SQL dan parameter berdasarkan apakah `nik` ada atau tidak
    if nik not in [None, 'None']:
        sql = """
                SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name,ic.terminal_sn,ic.terminal_alias
                FROM iclock_transaction AS ic
                LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id
                WHERE ic.emp_code = %s AND ic.punch_time BETWEEN %s AND %s
                ORDER BY ic.punch_time DESC, ic.emp_code ASC
                """
        where = (nik, startdate, enddate)
    else:
        sql = """
                SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name,ic.terminal_sn,ic.terminal_alias
                FROM iclock_transaction AS ic
                LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id
                WHERE  ic.punch_time BETWEEN %s AND %s
                ORDER BY ic.punch_time DESC, ic.emp_code ASC
                """
        where = (startdate, enddate)
    connection = get_database_connection()
    if connection:
        try:

            cursor = connection.cursor(dictionary=True)
            cursor.execute(sql, where)
            results = cursor.fetchall()

            cursor.execute("SELECT first_name,emp_code FROM personnel_employee ORDER BY emp_code ASC")
            results2 = cursor.fetchall()
            data =[]
            if 'dataniks' in session:
               data = session['dataniks']
            else:
                datanik = []
                seen = set()
                for row in results2:
                    if row['emp_code'] not in seen:
                        datanik.append(row)
                        seen.add(row['emp_code'])
                    session['dataniks'] = datanik
                    data = session['dataniks']

            cursor.close()
            connection.close()
            return render_template('transaksiall.html', title="Transaksi Page", data=results, tgl1=tgl1,
                                   tgl2=tgl2, nik=nik, datanik=data, dataerrors="")
        except Exception as e:
            return render_template('transaksiall.html', title="Transaksi Page", dataerrors=e)

    else:
        return render_template('transaksiall.html', title="Transaksi Page", dataerrors="Gagal terhubung ke database")
