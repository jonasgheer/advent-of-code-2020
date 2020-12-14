import { minBy } from "lodash";

type BusID = number;

export function getEarliestBus(
    arrivalEstimate: number,
    busIDs: BusID[]
): { busID: number; arrives: number } {
    const bus = minBy(
        busIDs.map((busID) => ({
            busID,
            arrives: Math.ceil(arrivalEstimate / busID) * busID,
        })),
        (bus) => bus.arrives
    );
    // how do i check arr length instead and convince ts bus is defined?
    if (!bus) {
        throw Error();
    }
    return bus;
}
