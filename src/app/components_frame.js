//let base = new Airtable({apiKey: `${process.env.API_TOKEN}`}).base('appPEaWJdX2OxF89e')
     
    /* fetch('https://api.airtable.com/v0/appPEaWJdX2OxF89e/shrOLj5l3SOR6qXcT', {
        headers: {Authorization: `Bearer ${process.env.API_TOKEN}`}
    })
   .then(resp => resp.json())
   .then(json => console.log(JSON.stringify(json))) */
/*     const [table, setTable] = useState();
    useEffect(() => {
    }, []) */
    /* base('Imported table').select({
        maxRecords: 3,
        view: "Grid View"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved', record.get(company_name))
        })
    fetchNextPage();
    }, function done(err) {
        if(err) { console.error(err); return; }
    }) */


    /* base('Imported table').select({
        view: 'Grid view'
    }).firstPage(function(err, records) {
        if(err) { console.error(err); return; }
        records.forEach(function(record) {
            console.log('Retrieved', record.get('first_name'));
        })
    }) */