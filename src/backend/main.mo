import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";

actor {
  // Data types
  type Appointment = {
    name : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    preferredDate : Text;
    message : Text;
  };

  type Contact = {
    name : Text;
    email : Text;
    message : Text;
  };

  module Appointment {
    public func compare(a1 : Appointment, a2 : Appointment) : Order.Order {
      switch (Text.compare(a1.preferredDate, a2.preferredDate)) {
        case (#equal) { Text.compare(a1.name, a2.name) };
        case (order) { order };
      };
    };
  };

  module Contact {
    public func compare(c1 : Contact, c2 : Contact) : Order.Order {
      switch (Text.compare(c1.name, c2.name)) {
        case (#equal) { Text.compare(c1.email, c2.email) };
        case (order) { order };
      };
    };
  };

  // Store for appointments and contacts
  let appointments = Map.empty<Text, Appointment>();
  let contacts = Map.empty<Text, Contact>();

  // Book an appointment
  public shared ({ caller }) func bookAppointment(name : Text, email : Text, phone : Text, serviceType : Text, preferredDate : Text, message : Text) : async () {
    let appointment : Appointment = {
      name;
      email;
      phone;
      serviceType;
      preferredDate;
      message;
    };
    appointments.add(name.concat(preferredDate), appointment);
  };

  // Submit contact form
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let contact : Contact = {
      name;
      email;
      message;
    };
    contacts.add(name.concat(email), contact);
  };

  // Query all appointments, sorted by preferredDate
  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray().sort();
  };

  // Query all contacts, sorted by name
  public query ({ caller }) func getAllContacts() : async [Contact] {
    contacts.values().toArray().sort();
  };
};
