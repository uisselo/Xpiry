import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import UnorderedList from "react-native-unordered-list";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default class privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(80) }}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.paragraph}>Last updated: October 14, 2021</Text>
            <Text style={styles.paragraph}>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </Text>
            <Text style={styles.paragraph}>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy. This Privacy
              Policy has been created with the help of the{" "}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://www.termsfeed.com/privacy-policy-generator/"
                  )
                }
              >
                Privacy Policy Generator
              </Text>
              .
            </Text>
            <Text style={styles.title}>Interpretation and Definitions</Text>
            <Text style={styles.subtitle}>Interpretation</Text>
            <Text style={styles.paragraph}>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </Text>
            <Text style={styles.subtitle}>Definitions</Text>
            <Text style={styles.paragraph}>
              For the purposes of this Privacy Policy:
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Account </Text>
                means a unique account created for You to access our Service or
                parts of our Service.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Affiliate </Text>
                means an entity that controls, is controlled by or is under
                common control with a party, where "control" means ownership of
                50% or more of the shares, equity interest or other securities
                entitled to vote for election of directors or other managing
                authority.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Application </Text>
                means the software program provided by the Company downloaded by
                You on any electronic device, named Xpiry.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Company </Text>
                (referred to as either "the Company", "We", "Us" or "Our" in
                this Agreement) refers to University of Santo Tomas (UST) Fourth
                Year Information Technology Students (Cabacongan, Dagañgon,
                Evale, Yu), España Blvd, Sampaloc, Manila, 1008 Metro Manila.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Country </Text>
                refers to: Philippines.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Device </Text>
                means any device that can access the Service such as a computer,
                a cellphone or a digital tablet.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Personal Data </Text>
                is any information that relates to an identified or identifiable
                individual.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Service </Text>
                refers to the Application.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Service Provider </Text>
                means any natural or legal person who processes the data on
                behalf of the Company. It refers to third-party companies or
                individuals employed by the Company to facilitate the Service,
                to provide the Service on behalf of the Company, to perform
                services related to the Service or to assist the Company in
                analyzing how the Service is used.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Usage Data </Text>
                refers to data collected automatically, either generated by the
                use of the Service or from the Service infrastructure itself
                (for example, the duration of a page visit).
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>You </Text>
                means the individual accessing or using the Service, or the
                company, or other legal entity on behalf of which such
                individual is accessing or using the Service, as applicable.
              </Text>
            </UnorderedList>
            <Text style={styles.title}>
              Collecting and Using Your Personal Data
            </Text>
            <Text style={styles.subtitle}>Types of Data Collected</Text>
            <Text
              style={[styles.subtitle, { fontSize: widthPercentageToDP(4) }]}
            >
              Personal Data
            </Text>
            <Text style={styles.paragraph}>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>First and last name</Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>Phone number</Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>Usage data</Text>
            </UnorderedList>
            <Text
              style={[styles.subtitle, { fontSize: widthPercentageToDP(4) }]}
            >
              Usage Data
            </Text>
            <Text style={styles.paragraph}>
              Usage Data is collected automatically when using the Service.
            </Text>
            <Text style={styles.paragraph}>
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser version,
              the pages of our Service that You visit, the time and date of Your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </Text>
            <Text style={styles.paragraph}>
              When You access the Service by or through a mobile device, We may
              collect certain information automatically, including, but not
              limited to, the type of mobile device You use, Your mobile device
              unique ID, the IP address of Your mobile device, Your mobile
              operating system, the type of mobile Internet browser You use,
              unique device identifiers and other diagnostic data.
            </Text>
            <Text style={styles.paragraph}>
              We may also collect information that Your browser sends whenever
              You visit our Service or when You access the Service by or through
              a mobile device.
            </Text>
            <Text style={styles.subtitle}>
              Information Collected while Using the Application
            </Text>
            <Text style={styles.paragraph}>
              While using Our Application, in order to provide features of Our
              Application, We may collect, with Your prior permission:
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Pictures and other information from your Device's camera and
                photo library
              </Text>
            </UnorderedList>
            <Text style={styles.paragraph}>
              We use this information to provide features of Our Service, to
              improve and customize Our Service. The information may be uploaded
              to the Company's servers and/or a Service Provider's server or it
              may be simply stored on Your device.
            </Text>
            <Text style={styles.paragraph}>
              You can enable or disable access to this information at any time,
              through Your Device settings.
            </Text>
            <Text style={styles.title}>Use of Your Personal Data</Text>
            <Text style={styles.paragraph}>
              The Company may use Personal Data for the following purposes:
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>
                  To provide and maintain our Service,{" "}
                </Text>
                including to monitor the usage of our Service.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>To manage Your Account: </Text>
                To manage Your registration as a user of the Service. The
                Personal Data You provide can give You access to different
                functionalities of the Service that are available to You as a
                registered user.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>
                  For the performance of a contract:{" "}
                </Text>
                The development, compliance and undertaking of the purchase
                contract for the products, items or services You have purchased
                or of any other contract with Us through the Service.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>To contact You: </Text>
                To contact You by email, telephone calls, SMS, or other
                equivalent forms of electronic communication, such as a mobile
                application's push notifications regarding updates or
                informative communications related to the functionalities,
                products or contracted services, including the security updates,
                when necessary or reasonable for their implementation.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>To provide You </Text>
                with news, special offers and general information about other
                goods, services and events which we offer that are similar to
                those that you have already purchased or enquired about unless
                You have opted not to receive such information.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>To manage Your requests: </Text>
                To attend and manage Your requests to Us.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>For business transfers: </Text>
                We may use Your information to evaluate or conduct a merger,
                divestiture, restructuring, reorganization, dissolution, or
                other sale or transfer of some or all of Our assets, whether as
                a going concern or as part of bankruptcy, liquidation, or
                similar proceeding, in which Personal Data held by Us about our
                Service users is among the assets transferred.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>For other purposes: </Text>
                We may use Your information for other purposes, such as data
                analysis, identifying usage trends, determining the
                effectiveness of our promotional campaigns and to evaluate and
                improve our Service, products, services, marketing and your
                experience.
              </Text>
            </UnorderedList>
            <Text style={styles.paragraph}>
              We may share Your personal information in the following
              situations:
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>With Service Providers: </Text>
                We may share Your personal information with Service Providers to
                monitor and analyze the use of our Service, to contact You.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>For business transfers: </Text>
                We may share or transfer Your personal information in connection
                with, or during negotiations of, any merger, sale of Company
                assets, financing, or acquisition of all or a portion of Our
                business to another company.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>For business transfers: </Text>
                We may share or transfer Your personal information in connection
                with, or during negotiations of, any merger, sale of Company
                assets, financing, or acquisition of all or a portion of Our
                business to another company.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>With Affiliates: </Text>
                We may share Your information with Our affiliates, in which case
                we will require those affiliates to honor this Privacy Policy.
                Affiliates include Our parent company and any other
                subsidiaries, joint venture partners or other companies that We
                control or that are under common control with Us.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>With business partners: </Text>
                We may share Your information with Our business partners to
                offer You certain products, services or promotions.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>With other users: </Text>
                When You share personal information or otherwise interact in the
                public areas with other users, such information may be viewed by
                all users and may be publicly distributed outside.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>With Your consent: </Text>
                We may disclose Your personal information for any other purpose
                with Your consent.
              </Text>
            </UnorderedList>
            <Text style={styles.title}>Retention of Your Personal Data</Text>
            <Text style={styles.paragraph}>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </Text>
            <Text style={styles.paragraph}>
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </Text>
            <Text style={styles.title}>Transfer of Your Personal Data</Text>
            <Text style={styles.paragraph}>
              Your information, including Personal Data, is processed at the
              Company's operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction.
            </Text>
            <Text style={styles.paragraph}>
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </Text>
            <Text style={styles.paragraph}>
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </Text>
            <Text style={styles.title}>Disclosure of Your Personal Data</Text>
            <Text style={styles.subtitle}>Business Transactions</Text>
            <Text style={styles.paragraph}>
              If the Company is involved in a merger, acquisition or asset sale,
              Your Personal Data may be transferred. We will provide notice
              before Your Personal Data is transferred and becomes subject to a
              different Privacy Policy.
            </Text>
            <Text style={styles.subtitle}>Law enforcement</Text>
            <Text style={styles.paragraph}>
              Under certain circumstances, the Company may be required to
              disclose Your Personal Data if required to do so by law or in
              response to valid requests by public authorities (e.g. a court or
              a government agency).
            </Text>
            <Text style={styles.subtitle}>Other legal requirements</Text>
            <Text style={styles.paragraph}>
              The Company may disclose Your Personal Data in the good faith
              belief that such action is necessary to:
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Comply with a legal obligation
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Protect and defend the rights or property of the Company
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Prevent or investigate possible wrongdoing in connection with
                the Service
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Protect the personal safety of Users of the Service or the
                public
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Protect against legal liability
              </Text>
            </UnorderedList>
            <Text style={styles.title}>Security of Your Personal Data</Text>
            <Text style={styles.paragraph}>
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </Text>
            <Text style={styles.title}>Children's Privacy</Text>
            <Text style={styles.paragraph}>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 13 without verification of
              parental consent, We take steps to remove that information from
              Our servers.
            </Text>
            <Text style={styles.paragraph}>
              If We need to rely on consent as a legal basis for processing Your
              information and Your country requires consent from a parent, We
              may require Your parent's consent before We collect and use that
              information.
            </Text>
            <Text style={styles.title}>Links to Other Websites</Text>
            <Text style={styles.paragraph}>
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third party link, You will be
              directed to that third party's site. We strongly advise You to
              review the Privacy Policy of every site You visit.
            </Text>
            <Text style={styles.paragraph}>
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third party sites or
              services.
            </Text>
            <Text style={styles.title}>Changes to this Privacy Policy</Text>
            <Text style={styles.paragraph}>
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </Text>
            <Text style={styles.paragraph}>
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy.
            </Text>
            <Text style={styles.paragraph}>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </Text>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.paragraph}>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                By email: louisse.evale.iics@ust.edu.ph
              </Text>
            </UnorderedList>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 50,
  },
  title: {
    fontSize: widthPercentageToDP(6),
    fontFamily: "Nunito-Bold",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: widthPercentageToDP(5),
    fontFamily: "Nunito-SemiBold",
    marginVertical: 5,
  },
  paragraph: {
    fontSize: widthPercentageToDP(3.75),
    fontFamily: "Nunito-Regular",
    paddingVertical: 5,
    textAlign: "justify",
    lineHeight: 30,
  },
  boldText: {
    fontFamily: "Nunito-Bold",
  },
  bullet: {
    width: 10,
    fontFamily: "Nunito-SemiBold",
    paddingVertical: 5,
    lineHeight: 25,
    marginLeft: 10,
  },
  link: {
    color: "#0645ad",
    textDecorationLine: "underline",
  },
});
