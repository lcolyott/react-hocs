import { BaseWidget } from "..";
import { useScript, withScript } from "../utilities";

const HookedWidget = withScript(BaseWidget, "https://use.typekit.net/foobar.js");

export default HookedWidget;