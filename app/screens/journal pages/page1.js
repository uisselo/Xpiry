import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import UnorderedList from "react-native-unordered-list";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default class page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(80) }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2860&q=80",
              }}
              style={styles.img}
            />
            <Text style={styles.title}>What are medicines? Drugs?</Text>
            <Text style={styles.paragraph}>
              Medicines are chemicals or compounds that are used to treat,
              prevent, or cure disease, as well as to relieve symptoms and aid
              in the diagnosis of illnesses. Medicine has advanced to the point
              where doctors can now heal numerous ailments and save lives.
            </Text>
            <Text style={styles.paragraph}>
              Consult your doctor before drinking medicines. Examine your
              allergies and any previous drug reactions, such as rashes,
              difficulty breathing, indigestion, dizziness, or mood swings.
            </Text>
            <Text style={styles.title}>Types of Medicines</Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>Prescriptions</Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Over-the-counter pills, liquids or creams
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Vitamins, eye drops or dietary supplements
              </Text>
            </UnorderedList>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1516826435551-36a8a09e4526?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80",
              }}
              style={styles.img}
            />
            <Text style={styles.title}>Tips on Medicine Intake</Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Take your medication at the same time every day.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                If you feel worse after taking a medicine, tell your doctor
                right away.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Take medicines exactly as prescribed. If the instructions say
                take one tablet four times a day, don't take two tablets twice a
                day. It's not the same.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Double-check if you have the right medicine. If you get the same
                prescription filled more than once, check that it's the same
                shape, size, and color as the last time. If not, be sure to ask
                the pharmacist about it.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                If you have any allergies, tell your doctor and pharmacist
                before they start you on a new medicine.
              </Text>
            </UnorderedList>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1543709533-c032159da7b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
              }}
              style={styles.img}
            />
            <Text style={styles.title}>
              What to do with expired medicine?
            </Text>
            <Text style={styles.paragraph}>
              The Food and Drug Administration in the United States began
              requiring an expiration date on prescription and over-the-counter
              drugs in 1979. The expiration date is crucial in determining
              whether or not a product is safe to use and will function as
              intended.
            </Text>
            <Text style={styles.paragraph}>
              Due to a change in chemical composition or a drop in potency,
              expired medical items may be less effective or dangerous. There is
              no guarantee that the medicine will be safe and effective after
              the expiration date has passed.
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
  img: {
    height: heightPercentageToDP(25),
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 0.05,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    paddingVertical: 10,
  },
  paragraph: {
    fontSize: 18,
    paddingVertical: 5,
    textAlign: "justify",
    lineHeight: 35,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 1,
  },
  bullet: {
    width: 10,
    fontWeight: "bold",
    paddingVertical: 5,
    lineHeight: 30,
  },
});
