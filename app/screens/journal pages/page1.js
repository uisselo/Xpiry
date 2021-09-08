// Tips on Medicine Intake

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Unorderedlist from "react-native-unordered-list";
import Carousel from "simple-carousel-react-native";

export default class page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Carousel style={styles.container}>
          <View>
            <Text style={[styles.title]}>What are Medicines?</Text>

            <Text style={[styles.content]}>
              Medicines are chemicals or compounds that are used to treat,
              prevent, or cure disease and relieve symptoms, and aid in the
              diagnosis of illnesses. Medicine has advanced to the point where
              doctors can now heal numerous ailments and save lives.
            </Text>

            <Text style={[styles.content]}>
              Consult your doctor before drinking medicines. Examine your
              allergies and any previous drug reactions, such as rashes,
              difficulty breathing, indigestion, dizziness, or mood swings.
            </Text>

            <Text
              style={[styles.link]}
              onPress={() =>
                Linking.openURL(
                  "https://www.nia.nih.gov/health/safe-use-medicines-older-adults"
                )
              }
            >
              Click Here for More Information
            </Text>
          </View>

          <View>
            <Text style={[styles.title]}>Tips on Medicine Intake</Text>
            <Text
              style={[styles.link]}
              onPress={() =>
                Linking.openURL(
                  "https://www.fda.gov/drugs/special-features/why-you-need-take-your-medications-prescribed-or-instructed"
                )
              }
            >
              Click Here for More Information
            </Text>

            <Unorderedlist bulletUnicode={0x2023} style={[styles.bullet]}>
              <Text style={[styles.content]}>
                Take your medication at the same time every day.
              </Text>
            </Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023} style={[styles.bullet]}>
              <Text style={[styles.content]}>
                If you feel worse after taking a medicine, tell your doctor
                right away.
              </Text>
            </Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023} style={[styles.bullet]}>
              <Text style={[styles.content]}>
                Take medicines exactly as prescribed. If the instructions say
                take one tablet four times a day, don't take two tablets twice a
                day. It's not the same.
              </Text>
            </Unorderedlist>
            <Unorderedlist bulletUnicode={0x2023} style={[styles.bullet]}>
              <Text style={[styles.content]}>
                Double-check that you have the right medicine. If you get the
                same prescription filled more than once, check that it's the
                same shape, size, and color as the last time. If not, be sure to
                ask the pharmacist about it.
              </Text>
            </Unorderedlist>
          </View>

          <View>
            <Text style={[styles.title]}>
              What To Do With Expired Medicine?
            </Text>

            <Text style={[styles.content]}>
              The Food and Drug Administration in the United States began
              requiring an expiration date on prescription and over-the-counter
              drugs in 1979. The expiration date is crucial in determining
              whether or not a product is safe to use and will function as
              intended.
            </Text>

            <Text style={[styles.content]}>
              Due to a change in chemical composition or a drop in potency,
              expired medical items may be less effective or dangerous. There is
              no guarantee that the medicine will be safe and effective after
              the expiration date has passed.
            </Text>

            <Text
              style={[styles.link]}
              onPress={() =>
                Linking.openURL(
                  "https://www.fda.gov/drugs/special-features/dont-be-tempted-use-expired-medicines"
                )
              }
            >
              Click Here for More Information
            </Text>
          </View>
        </Carousel>
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
    paddingTop: 50,
    paddingLeft: 10,
    fontSize: 30,
    borderRadius: 30,
    // backgroundColor: "pink"
  },
  bullet: {
    //fontFamily: 'Courier-Bold',
    fontSize: 25,
    textShadowRadius: 1,
    margin: 10,
    textAlign: "justify",
    padding: 10,
  },
  content: {
    //  fontFamily: "Courier-Bold",
    fontSize: 20,
    textShadowRadius: 1,
    margin: 10,
    textAlign: "left",
    padding: 5,
  },
  link: {
    fontSize: 20,
    textShadowRadius: 1,
    margin: 10,
    fontWeight: "bold",
    textAlign: "justify",
    padding: 10,
    color: "#EA4C4C",
  },
});
