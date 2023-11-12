// effect, track and trigger




// ++> ep 1
let product = { price: 5, quantity: 2 };
let total = 0;
let effect = () => {
    total = product.price * product.quantity;
}

track(product, 'quantity');
effect()

const targetMap = new WeakMap();

function track(target, key) {
    let depsMap = targetMap.get(target);

    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key);

    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }

    dep.add(effect)
}

function trigger(target, key) {
    const depsMap = targetMap.get(target);

    if (!depsMap) return;

    let dep = depsMap.get(key);

    if (dep) {
        dep.forEach(effect => { effect() })
    }
}

// ++> ep 2

function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver);
            track(target, key)
            return result;
        },

        set(target, key, value, receiver) {
            let oldValue = target[key];
            let result = Reflect.set(target, key, value, receiver);

            if (result && oldValue != value) {
                trigger(target, key)
            }
            return result;
        },
    }

    return new Proxy(target, handler)
}

product = reactive({ price: 5, quantity: 2 });


// ++> ep 3

const activeEffect = null;

function effect(eff) {
    activeEffect = eff;
    activeEffect();
    activeEffect = null
}

function track(target, key) {
    if (activeEffect) {

        let depsMap = targetMap.get(target);

        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }

        let dep = depsMap.get(key);

        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        dep.add(activeEffect)
    }
}

function ref(raw) {
    const r = {
        get value() {
            track(r, 'value');
            return raw;
        },
        set value(newValue) {
            raw = newValue;
            trigger(r, 'value')
        }
    }
    return r;
}

// ++> ep 4
