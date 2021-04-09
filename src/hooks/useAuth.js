/*jshint esversion: 6 */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default () => useContext(AuthContext);
