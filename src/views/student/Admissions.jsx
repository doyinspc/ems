import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import moment from "moment";

const POSTER_PATH = process.env.PUBLIC_URL + "/avatars/logo.png";
const POSTER_PATH1 = process.env.PUBLIC_URL + "/avatars/logo1.png";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        color:"#000000",
        fontSize:'9px'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    lines: {
        display:'block'
    },
    para:{marginTop:'20px', fontSize:'25px', textAlign:'justify', lineHeight:'200%'},
    movieContainer: {
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        padding: 5
    },
    sectionTop: {
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    movieDetails: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        marginLeft: 5
    },
    movieTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    movieOverview: {
        fontSize: 10
    },

    image: {
        height: 200,
        width: 150
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 150,
        alignItems: "center",
        marginBottom: 12
    },
    vote: {
        display: "flex",
        flexDirection: "row"
    },
    rating: {
        height: 10,
        width: 10
    },
    vote_text: {
        fontSize: 10
    },
    vote_pop: {
        fontSize: 10,
        padding: 2,
        backgroundColor: "#61C74F",
        color: "#fff"
    },
    vote_pop_text: {
        fontSize: 10,
        marginLeft: 4
    },
    overviewContainer: {
        minHeight: 110
    },
    detailsFooter: {
        display: "flex",
        flexDirection: "row"
    },
    lang: {
        fontSize: 8,
        fontWeight: 700
    },
    vote_average: {
        fontSize: 8,
        marginLeft: 4,
        fontWeight: "bold"
    }
});

export function PdfDocument(props) {

    let {
        id,
        surname,
        firstname,
        middlename,
        abbrv,
        cclass,
        schoolid,
        schoolname,
        session,
        address,
        status,
        signed
    
    } = props.admission || {}
    console.log("pdf props", props.data);
    return (
        <Document>
            <Page style={styles.page}>
                {props.data ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <View style={styles.sectionTop}>
                                        <View style={{width:'150px'}}>
                                        <Image
                                            style={styles.image}
                                            source={POSTER_PATH}
                                        />
                                        </View>
                                        <View  >
                                        <Text>
                                            <Text style={styles.lines}>MESL Staff School</Text>
                                            <Text style={styles.lines}>Kainji & Jebba Hydro Power Plant</Text>
                                            <Text style={styles.lines}>07035992972 (Jebba)</Text>
                                            <Text style={styles.lines}>07035839707 (Kainji)</Text>
                                        </Text>
                                        </View>
                                        <View  >
                                        <Text>
                                            <Text style={styles.lines}>2nd Floor, ACHILLES PLACE</Text>
                                            <Text style={styles.lines}>11, Maye Street</Text>
                                            <Text style={styles.lines}>Off Commercial Avenue</Text>
                                            <Text style={styles.lines}> Yaba, Lagos Statet</Text>
                                            <Text style={styles.lines}>+234 906 8808 021</Text>
                                            <Text style={styles.lines}>info@stresertintegrated.com</Text>
                                        </Text>
                                        </View >
                                        <View  style={{width:'150px'}}>
                                        <Image
                                            style={styles.image}
                                            source={POSTER_PATH1}
                                        />
                                        </View>
                                    </View>
                                    <View style={styles.sectionRef}>
                                    <Text>REF:{a.abbrv}{a.session}/{a.id}</Text>
                                    </View>
                                    <View style={styles.sectionDate}>
                                    <Text>{moment(new Date()).format('MMMM DD, YYYY')}</Text>
                                    </View>
                                    <View style={styles.sectionName}>

                                    </View>
                                    <View style={styles.sectionAddress}>

                                    </View>
                                    <View style={styles.sectionTitle}>
                                        <Text>Admission Letter</Text>
                                    </View>
                                    <View>
                                    <Text  style={styles.para}>
                                    Following your performance at our {session} academic session entrance examination and interveiw exercise, 
                                    we are pleased to inform you that you have been offered {a.status} into RECEPTION 1 class at
                                     {schoolname} .
                                    </Text>
                               
                                    <Text  style={styles.para}>
                                        Attached to this letter you will find a full admission package along with specific details on how you can accept this offer. 
                                        We ask that you respond to this offer within two (2) weeks effective from the date of issuance of this letter as indicated above. 
                                        Failure to do so will result in the immediate withdrawal of this offer.
                                    </Text>
                                    <Text  style={styles.para}>
                                        Once again, congratulations. We hope to hear from you soon.
                                    </Text>
                                
                                    </View>
                                    <View style={styles.detailsFooter}>
                                            <Text>Yours Sincerely,

                                            {a.signed}
                                            for : School Management</Text>

                                    </View>
                                    
                                </View>
                    );
                })
            : ""}
            </Page>
        </Document>
    );
}