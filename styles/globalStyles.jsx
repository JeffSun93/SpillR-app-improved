import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingHorizontal: theme.spacing.md,
  },

  sectionTitle: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  horizontalList: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "48%",
    marginBottom: 12,
  },
});
