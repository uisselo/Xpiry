import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
            <Text style={{ fontSize: 30, marginBottom: 15 }}>Privacy Policy</Text>
              <Text style={{ fontSize: 18, padding:3 }}>
                This privacy notice describes how we might use your information if you:
                Download and use our mobile application — Xpiry
                Engage with us in other related ways ― including any sales, marketing, or events
                In this privacy notice, if we refer to:
                "App," we are referring to any application of ours that references or links to this policy, including any listed above
                "Services," we are referring to our App, and other related services, including any sales, marketing, or events
                The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
              </Text>
                <Text style={{ fontSize: 18, padding:3 }}>
               The purpose of this privacy notice is to explain to you in the clearest way possible what 
               information we collect, how we use it, and what rights you have in relation to it. If there
                are any terms in this privacy notice that you do not agree with, please discontinue use of 
                our Services immediately.

                Please read this privacy notice carefully, as it will help you understand what we do with
                 the information that we collect.{"\n"}

              </Text>
               <Text style={{ fontSize: 18, padding:3 }}>
                   TABLE OF CONTENTS
                {"\n"}
                1. WHAT INFORMATION DO WE COLLECT?{"\n"}
                2. HOW DO WE USE YOUR INFORMATION?{"\n"}
                3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?{"\n"}
                4. HOW LONG DO WE KEEP YOUR INFORMATION?{"\n"}
                5. HOW DO WE KEEP YOUR INFORMATION SAFE?{"\n"}
                6. DO WE COLLECT INFORMATION FROM MINORS?{"\n"}
                7. WHAT ARE YOUR PRIVACY RIGHTS?{"\n"}
                8. CONTROLS FOR DO-NOT-TRACK FEATURES{"\n"}
                9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?{"\n"}
                10. DO WE MAKE UPDATES TO THIS NOTICE?{"\n"}
                11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?{"\n"}
                12. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?{"\n"}
               </Text>
               <Text style={{ fontSize: 18, padding:3 }}>
               1. WHAT INFORMATION DO WE COLLECT?{"\n"}

                Personal information you disclose to us

                In Short:  We collect personal information that you provide to us.

                We collect personal information that you voluntarily provide to us when you register on the App, express an interest in obtaining information about us or our products and Services, when you participate in activities on the App or otherwise when you contact us.

                The personal information that we collect depends on the context of your interactions with us and the App, the choices you make and the products and features you use. The personal information we collect may include the following:

                Personal Information Provided by You. We collect phone numbers; names; and other similar information.

                All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.

            </Text>
             <Text style={{ fontSize: 18, padding:3 }}>
                 Information automatically collected{"\n"}

                In Short:  Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our App.

                We automatically collect certain information when you visit, use or navigate the App. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our App and other technical information. This information is primarily needed to maintain the security and operation of our App, and for our internal analytics and reporting purposes.

             </Text>
             <Text style={{ fontSize: 18, padding:3 }}>
             Information collected through our App 

             {"\n"}In Short:  We collect information regarding your mobile device, push notifications, when you use our App.

                If you use our App, we also collect the following information:
                Mobile Device Access. We may request access or permission to certain features from your mobile device, including your mobile device's camera, calendar, sms messages, reminders, and other features. If you wish to change our access or permissions, you may do so in your device's settings.
                Push Notifications. We may request to send you push notifications regarding your account or certain features of the App. If you wish to opt-out from receiving these types of communications, you may turn them off in your device's settings.
                This information is primarily needed to maintain the security and operation of our App, for troubleshooting and for our internal analytics and reporting purposes.
            </Text>
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
});
