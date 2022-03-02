# dbsetting usage

# 1. uiJ/routes/dbsetting.js 파일을 복사하고
# 2. 해당 프로젝트에서 원하는 폴더에 넣은 다음
# 3. dbsetting을 사용할 js 파일에 들어가서
# 4. 최상단에 var dbsetting = require('./{복사해간 파일경로  !!! .js는 생략하는게 일반적이였음 !!! }')
# 5. 이후 mysql 또한 require로 가져온 다음
# 6. 아래 부분을 복사한 뒤,

var connection = mysql.createConnection({
      host     : dbsetting.host,
      port     : dbsetting.port,
      user     : dbsetting.user,
      password : dbsetting.password,
      database : dbsetting.database
    });

    connection.connect();
# 7. connection.query('원하는 쿼리문', (error, rows, fields) => {if (error) throw (error)})로 해주면 된다.
# 8. connection.end();로 항상 connection을 사용후 닫아줄 것.

# select로 가져올 경우
# 뒤에 (error,rows,fields)에 저장이 되고, 해당 내용(rows, fields)을 var로 저장해서 해당 스코프에서 사용하면 된다.