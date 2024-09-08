/**
 * @file useInterval.test.js
 * @brief Ce fichier contient des tests pour le hook useInterval.
 */
import { act, renderHook } from '@testing-library/react'

import useInterval from '../useInterval'

jest.useFakeTimers()

describe('useInterval', () => {
    it('should call the callback function repeatedly with the specified delay', () => {
        const callback = jest.fn()
        const delay = 1000

        renderHook(() => useInterval(callback, delay))

        expect(callback).toHaveBeenCalledTimes(0)

        act(() => {
            jest.advanceTimersByTime(delay)
        })

        expect(callback).toHaveBeenCalledTimes(1)

        act(() => {
            jest.advanceTimersByTime(delay)
        })

        expect(callback).toHaveBeenCalledTimes(2)

        act(() => {
            jest.advanceTimersByTime(delay)
        })

        expect(callback).toHaveBeenCalledTimes(3)
    })

    it('should stop calling the callback function after delay is set to null', () => {
        const callback = jest.fn()
        const delay = 1000

        const { rerender } = renderHook((props) => useInterval(...props), {
            initialProps: [callback, delay],
        })

        expect(callback).toHaveBeenCalledTimes(0)

        act(() => {
            jest.advanceTimersByTime(delay)
        })

        expect(callback).toHaveBeenCalledTimes(1)

        rerender([callback, null])

        act(() => {
            jest.advanceTimersByTime(delay)
        })

        expect(callback).toHaveBeenCalledTimes(1)

        act(() => {
            jest.advanceTimersByTime(delay)
        })

        expect(callback).toHaveBeenCalledTimes(1)
    })
})
