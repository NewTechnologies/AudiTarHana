    try {
        var body = '';
        var conn;
        var query;
        var pstmt;

        // open db connection needed for repository sessions
        conn = $.db.getConnection();
        
        query = 'DELETE FROM "AUDITAR"."ar.com.newtechnologies.auditar.hana.data::auditar.Tx.Vencimiento"';
        pstmt = conn.prepareStatement(query);
        pstmt.execute();
        pstmt.close();
        body = body + 'Borrando Vtos.\n';
        
        query = 'DELETE FROM "AUDITAR"."ar.com.newtechnologies.auditar.hana.data::auditar.Tx.Cupon"';
        pstmt = conn.prepareStatement(query);
        pstmt.execute();
        pstmt.close();
        body = body + 'Borrando Cupones.\n';

        query = 'DELETE FROM "AUDITAR"."ar.com.newtechnologies.auditar.hana.data::auditar.Rf.Marca"';
        pstmt = conn.prepareStatement(query);
        pstmt.execute();
        pstmt.close();
        body = body + 'Borrando Marcas.\n';

        query = 'DELETE FROM "AUDITAR"."ar.com.newtechnologies.auditar.hana.data::auditar.Rf.Empresa"';
        pstmt = conn.prepareStatement(query);
        pstmt.execute();
        pstmt.close();
        body = body + 'Borrando Empresas.\n';


        query = 'DELETE FROM "AUDITAR"."ar.com.newtechnologies.auditar.hana.data::auditar.Rf.Pais"';
        pstmt = conn.prepareStatement(query);
        pstmt.execute();
        pstmt.close();
        body = body + 'Borrando Pais.\n';

        conn.commit();

        $.response.status = $.net.http.OK;
        $.response.setBody(body);

    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
    }