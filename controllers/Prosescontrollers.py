import base64

from flask import session, request, jsonify
import io

from openpyxl.workbook import Workbook

from database.config import get_database_connection


def loginproses():
    connection = get_database_connection()
    if connection:
        connection.close()
        useradmin = "admin"
        useradminpassword = "qaz741852963"
        username = request.form['username']
        password = request.form['password']
        if username == useradmin and password == useradminpassword:
            session['loggedin'] = True
            session[username] = useradmin
            return jsonify({"status": 200, "messages": "Login berhasil", "linked": "dashboard"})
        else:
            session['loggedin'] = False
            return jsonify({"status": 404, "messages": "Password atau username salah"})

    else:
        return jsonify({"status": 404, "messages": "Gagal terhubung ke database"})


def export_excel():
    connection = get_database_connection()
    if connection:
        try:
            serialnumber = request.form['serialnumber']
            nik = request.form['nik']
            startdate = request.form['startdate']
            enddate = request.form['enddate']
            if serialnumber !="None" :
                if nik != "None":
                    sql = """SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name,ic.terminal_sn,ic.terminal_alias FROM iclock_transaction AS ic LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id WHERE ic.terminal_sn = %s AND ic.emp_code = %s AND ic.punch_time BETWEEN %s AND %s ORDER BY  ic.emp_code ASC"""
                    where = (serialnumber, nik, startdate, enddate)
                else:
                    sql = """SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name,ic.terminal_sn,ic.terminal_alias FROM iclock_transaction AS ic LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id WHERE ic.terminal_sn = %s AND ic.punch_time BETWEEN %s AND %s ORDER BY  ic.emp_code ASC"""
                    where = (serialnumber, startdate, enddate)
            else:
                if nik != "None":
                    sql = """SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name,ic.terminal_sn,ic.terminal_alias FROM iclock_transaction AS ic LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id WHERE  ic.emp_code = %s AND ic.punch_time BETWEEN %s AND %s ORDER BY ic.emp_code ASC"""
                    where = (nik, startdate, enddate)
                else:
                    sql = """SELECT ic.emp_code, ic.punch_time, ic.punch_state, ic.verify_type, pr.first_name,ic.terminal_sn,ic.terminal_alias FROM iclock_transaction AS ic LEFT JOIN personnel_employee AS pr ON pr.id = ic.emp_id WHERE ic.punch_time BETWEEN %s AND %s ORDER BY  ic.emp_code ASC"""
                    where = (startdate, enddate)

            cursor = connection.cursor(dictionary=True)
            cursor.execute(sql, where)
            results = cursor.fetchall()
            if not results:
                # Jika tidak ada hasil
                response = {
                    'status': 404,
                    'messages': 'Tidak ada data ditemukan untuk kriteria yang diberikan.'
                }
                return jsonify(response)
            output = io.BytesIO()
            workbook = Workbook()
            sheet = workbook.active
            # Menambahkan header kolom
            headers = ['Nik', 'Nama', 'Serial', 'Mesin','Jam', 'verify1', 'verify1']
            sheet.append(headers)

            # Menambahkan baris data
            for row in results:
                data_row = [
                    row['emp_code'],
                    row['first_name'],
                    row['terminal_sn'],
                    row['terminal_alias'],
                    row['punch_time'].strftime('%Y-%m-%d %H:%M:%S'),  # Ubah ke format tanggal yang diinginkan
                    row['punch_state'],
                    row['verify_type']

                ]
                sheet.append(data_row)
            workbook.save(output)
            output.seek(0)  # Reset posisi ke awal

            # Mengkonversi ke Base64
            xls_data = output.read()
            base64_excel = base64.b64encode(xls_data).decode('utf-8')

            cursor.close()
            connection.close()
            # Membuat response JSON
            response = {
                'status': 200,
                'messages': 'Berhasil Di Download',
                'file': f"data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,{base64_excel}",
                'downloader': '.xlsx',
                'title': 'Data Absensi'
            }
        except Exception as e:
            response = {
                'status': 404,
                'messages': 'Gagal Mendownload \n' + str(e),
            }
    else:
        response = {
            'status': 404,'messages': 'Gagal Mendownload tidak terkoneksi database',
        }

    return jsonify(response)
