import React,
{
    useEffect,
    useState
} from 'react' //eslint-disable-line
import Papa from 'papaparse';

const CsvTable = ({ data }: { data: any }) => {

    const [csv, setcsv] = useState<any>([]); //eslint-disable-line
    const [column, setColumn] = useState<any>([]);
    const [values, setValues] = useState<any>([]);

    useEffect(() => {
        const fetchParseData = async () => {
            const encodedValue = encodeURIComponent(data)
            const decodedValue = decodeURIComponent(encodedValue);

            Papa.parse(decodedValue, {
                header: true,
                skipEmptyLines: true,
                complete: ((result) => {

                    const columnArray: any = [];
                    const valueArray: any = [];

                    result.data.forEach((d: any) => {
                        columnArray.push(Object.keys(d));
                        valueArray.push(Object.values(d));
                    }) 
                    setcsv(result.data)
                    setColumn(columnArray[0]);
                    setValues(valueArray);

                    console.log()
                })
            })

        }
        fetchParseData();
    }, []) //eslint-disable-line
    return (
        <table style={{ borderCollapse: 'collapse', margin: "5px auto" }} className='csv_table'>
            <thead>
                <tr>
                    {column.map((col: any, index: any) => (
                        <th key={index} style={{}}>{col}</th>))}
                </tr>
            </thead>
            <tbody style={{}}>
                {values.map((v: any, i: any) => (
                    <tr key={i}>
                        {v.map((value: any, index: any) => (
                            <td key={index}>{value}</td>
                        ))}
                    </tr>
                ))}
                <tr >
                </tr>

            </tbody>
        </table>)

}

export default CsvTable;