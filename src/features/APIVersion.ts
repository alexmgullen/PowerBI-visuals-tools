import { Visual } from "../Visual.js";
import { readJsonFromRoot } from "../utils.js";
import BaseFeature from "./BaseFeature.js";
import { Severity, Stage, VisualFeatureType } from "./FeatureTypes.js";

export default class APIVersion implements BaseFeature {
    public static featureName = "Api"
    public static severity = Severity.Error
    public static stage = Stage.PreBuild
    public static visualFeatureType = VisualFeatureType.NonSlicer
    public static minAPIversion: string;
    public static errorMessage: string;

    static async isSupported(visual: Visual) {
        const globalConfig = await readJsonFromRoot('config.json');
        this.minAPIversion = globalConfig.constants.minAPIversion;
        this.errorMessage = `API version must be at least ${this.minAPIversion}.`
        return visual.doesAPIVersionMatch(this.minAPIversion)
    }
}