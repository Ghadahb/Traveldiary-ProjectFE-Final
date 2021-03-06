import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class TripStore {
  trips = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTrips = async () => {
    try {
      const response = await instance.get("/trip");
      this.trips = response.data;
      this.isLoading = false;
    } catch (error) {
      console.log("TripStore -> fetchTrips -> error", error);
    }
  };

  createTrip = async (newTrip) => {
    try {
      const formData = new FormData();
      for (const key in newTrip) {
        // console.log(key)
        formData.append(key, newTrip[key]);
      }
      const response = await instance.post("/trip", formData);
      this.trips.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  updateTrip = async (updatedTrip, tripId) => {
    try {
      const formData = new FormData();

      for (const key in updatedTrip) {
        // console.log(key)
        formData.append(key, updatedTrip[key]);
      }
      const res = await instance.put(`/trip/${tripId}`, formData);
      console.log(res.data);
      this.trips = this.trips.map((trip) =>
        trip._id === tripId ? res.data : trip
      );
    } catch (error) {
      console.log("tripStore -> updateTrip -> error", error);
    }
  };

  deleteTrip = async (tripId) => {
    try {
      await instance.delete(`/trip/${tripId}`);
      this.trips = this.trips.filter((trip) => trip._id !== tripId);
    } catch (error) {
      console.log("TripStore -> deleteTrip -> error", error);
    }
  };
}

const tripStore = new TripStore();
tripStore.fetchTrips();

export default tripStore;
