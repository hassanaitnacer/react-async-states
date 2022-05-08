import { ProducerConfig, ProducerProps, ProducerSavedProps } from "../react-async-states/src/async-state";
import { PartialUseAsyncStateConfiguration } from "react-async-states/src/types.internal";
export declare const __DEV__: boolean;
export declare const EMPTY_ARRAY: readonly never[];
export declare const EMPTY_OBJECT: Readonly<{}>;
export declare function shallowClone(source1: any, source2?: any): any;
export declare const AsyncStateStatus: {
    error: string;
    pending: string;
    success: string;
    aborted: string;
    initial: string;
};
export declare function asyncify(fn: any): (...args: any[]) => Promise<void>;
export declare function invokeIfPresent(fn: any, ...args: any[]): any;
export declare function shallowEqual<T>(prev: T, next: any): boolean;
export declare function identity(...args: any[]): any;
export declare function oneObjectIdentity<T>(obj: T): T;
export declare function cloneProducerProps<T>(props: ProducerProps<T>): ProducerSavedProps<T>;
export declare function readProducerConfigFromSubscriptionConfig<T>(configuration: PartialUseAsyncStateConfiguration<T, any>): ProducerConfig<T>;
export declare function readProducerConfigFromProducerConfig<T>(configuration?: ProducerConfig<T>): ProducerConfig<T>;
export declare function numberOrZero(maybeNumber: any): number;
export declare function warning(...args: any[]): void;
export declare function isFn(fn: Function | any): boolean;
export declare function isPromise(candidate: any): boolean;
export declare function isGenerator(candidate: any): boolean;