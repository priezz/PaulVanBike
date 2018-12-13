import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class StatusBar extends StatelessWidget {
    final String brightness;
    StatusBar(this.brightness);

    @override
    Widget build(BuildContext context) => AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light.copyWith(
            statusBarColor: Colors.transparent,
            statusBarIconBrightness: brightness == 'light' ? Brightness.light : Brightness.dark,
            systemNavigationBarColor: Colors.grey[200],
            systemNavigationBarIconBrightness: Brightness.dark,
        ),
        child: Container(),
    );
}
