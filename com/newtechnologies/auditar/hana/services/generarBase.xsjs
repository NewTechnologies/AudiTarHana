    try {
        var conn = $.db.getConnection();


        // -------------- Pais 
        
        var query = "INSERT INTO \"AUDITAR\".\"ar.com.newtechnologies.auditar.hana.data::auditar.Rf.Pais\" " + 
                " (\"PAISID\", \"DESCRIPCION\")" +
                " VALUES(?, ?)";
        var pstmt = conn.prepareStatement(query);
        pstmt.setInt(1, 1);
        pstmt.setString(2, "Argentina");
        pstmt.executeUpdate();

        pstmt.setInt(1, 2);
        pstmt.setString(2, "Chile");
        pstmt.executeUpdate();

        pstmt.setInt(1, 3);
        pstmt.setString(2, "Uruguay");
        pstmt.executeUpdate();

        pstmt.close();

        conn.commit();
        
        
        // -------------- Marca
        
        query = "INSERT INTO \"AUDITAR\".\"ar.com.newtechnologies.auditar.hana.data::auditar.Rf.Marca\" " + 
                " (\"MARCAID\", \"DESCRIPCION\")" +
                " VALUES(?, ?)";
        pstmt = conn.prepareStatement(query);
        pstmt.setInt(1, 1);
        pstmt.setString(2, "Visa");
        pstmt.executeUpdate();

        pstmt.setInt(1, 2);
        pstmt.setString(2, "Master");
        pstmt.executeUpdate();

        pstmt.setInt(1, 3);
        pstmt.setString(2, "American Express");
        pstmt.executeUpdate();

        pstmt.close();
        conn.commit();

        // --------- Empresa        
        
        query = "INSERT INTO \"AUDITAR\".\"ar.com.newtechnologies.auditar.hana.data::auditar.Rf.Empresa\" " + 
	             " (\"EMPRESAID\", \"DESCRIPCION\", \"PAISID.PAISID\", \"ACTIVA\", \"TIPO_EMPRESA\", \"RANKING\")" +
                " VALUES(?, ?, ?, ?, ?, ?)";
        pstmt = conn.prepareStatement(query);
        pstmt.setInt(1, 1);
        pstmt.setString(2, "Acme SA");
        pstmt.setInt(3, 1);
        pstmt.setString(4, "S");
        pstmt.setString(5, "X");
        pstmt.setInt(6, 1);
        pstmt.executeUpdate();

        pstmt.setInt(1, 2);
        pstmt.setString(2, "New Technologies");
        pstmt.setInt(3, 1);
        pstmt.setString(4, "S");
        pstmt.setString(5, "X");
        pstmt.setInt(6, 1);
        pstmt.executeUpdate();

        pstmt.setInt(1, 3);
        pstmt.setString(2, "Datafix");
        pstmt.setInt(3, 1);
        pstmt.setString(4, "S");
        pstmt.setString(5, "X");
        pstmt.setInt(6, 1);
        pstmt.executeUpdate();

        pstmt.close();
        conn.commit();

        conn.close();
        
        $.response.status = $.net.http.OK;
        $.response.setBody("Creado !!!");        
    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
    }
