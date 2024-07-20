use std::collections::HashMap;
use std::sync::Mutex;

lazy_static::lazy_static! {
    static ref CACHE: Mutex<HashMap<String, u32>> = Mutex::new(HashMap::new());
}

fn expensive_calculation(arg: &str) -> u32 {
    println!("Calculating for {}", arg);
    arg.len() as u32
}

fn cached_expensive_calculation(arg: &str) -> u32 {
    let mut cache = CACHE.lock().unwrap();
    
    match cache.get(arg) {
        Some(result) => *result,
        None => {
            let result = expensive_calculation(arg);
            cache.insert(arg.to_string(), result);
            result
        },
    }
}

fn main() {
    println!("{}", cached_expensive_calculation("test"));
    println!("{}", cached_expensive_calculation("test"));
}