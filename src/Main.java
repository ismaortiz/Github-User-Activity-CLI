import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpClient.Redirect;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.regex.*;
//import com.fasterxml.jackson.databind.*;
public class Main {

	public static void main(String[] args) {
		// First the user input is checked for errors like invalid user names
		// Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen
		System.out.print("\nRemember that the username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen\n");
		if (args.length == 0) {
			System.err.println("\nCouldn't read a username");
			return;
		}
		String username = args[0]; 
		Pattern username_pattern = Pattern.compile("\\b-{2,}\\b|[^a-zA-Z0-9-]|^-|-$");
		Matcher username_checker = username_pattern.matcher(username);
		boolean incorrect_username = username_checker.find();
		
		if (incorrect_username || username.length() > 39) {
			System.err.print("\n" + "\"" + username + "\"" + " is not a valid username");
			return;
		}
		
		
	}
	
	public static void fetchUserData(String username) {
		HttpClient client = HttpClient.newBuilder()
				.followRedirects(Redirect.NORMAL)
				.connectTimeout(Duration.ofSeconds(8))
				.build();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://api.github.com/search/users?q=" + username))
				.GET()
				.build();
		//Json
	}
}
