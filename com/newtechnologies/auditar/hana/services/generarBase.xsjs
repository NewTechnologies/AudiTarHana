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

        // -- cupones y vtos 
        var i;
        query = "INSERT INTO \"AUDITAR\".\"ar.com.newtechnologies.auditar.hana.data::auditar.Tx.Cupon\" "  + 
	             " (\"CUPONID\",\"EMPRESAID.EMPRESAID\",\"MARCAID.MARCAID\",\"IMPORTE\",\"CANTIDADCUOTAS\",\"OBSERVACION\",\"FECHA_OPERACION\")" +
                " VALUES(?, ?, ?, ?, ?, ?,?)";
        pstmt = conn.prepareStatement(query);

        query = "INSERT INTO \"AUDITAR\".\"ar.com.newtechnologies.auditar.hana.data::auditar.Tx.Vencimiento\" "  + 
	             " (\"VENCIMIENTOID\", \"CUPONID.CUPONID\",\"NROCUOTA\",\"IMPORTE\",\"FECHA_PAGO\",\"CONCILIACIONID\") " +
                " VALUES(?, ?, ?, ?, ?, ?)";
        var pstmtVto = conn.prepareStatement(query);

        for (i = 0; i < 100000; i++) {
            var empresa = Math.floor((Math.random() * 10) + 1) % 2 + 1;            
            var marca = Math.floor((Math.random() * 10) + 1) % 3 + 1;
            var importe = Math.floor((Math.random() * 100) + 1);
            var anio = Math.floor((Math.random() * 10) + 1)+2006;
            var mes = Math.floor((Math.random() * 100) + 1) % 12 + 1;
            var dia = Math.floor((Math.random() * 100) + 1) % 28 + 1;
            var anioStr = anio + "";
            var mesStr = mes + "";
            var diaStr = dia + "";
            if(mes < 10) { 
                mesStr = "0" + mesStr;
            }
            if(dia < 10) {
                diaStr = "0" + diaStr;
            }
            
            pstmt.setInt(1, i);
            pstmt.setInt(2, empresa);
            pstmt.setInt(3, marca);
            pstmt.setDecimal(4, importe);
            pstmt.setInt(5, 1);
            pstmt.setString(6, "x");
            pstmt.setDate(7, anioStr+mesStr+diaStr);
            pstmt.executeUpdate();
            
            pstmtVto.setInt(1, i);
            pstmtVto.setInt(2, i);
            pstmtVto.setInt(3, 1);
            pstmtVto.setDecimal(4, importe);
            pstmtVto.setDate(5, anioStr+mesStr+diaStr);
            pstmtVto.setInt(6, 1);
            pstmtVto.executeUpdate();
            
        }
        pstmt.close();
        conn.commit();

        conn.close();
        
        $.response.status = $.net.http.OK;
        $.response.setBody("Creado !!!");        
    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
    }
